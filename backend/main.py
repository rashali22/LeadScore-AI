import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

# Global reference for the loaded ML model
model = None


def load_model():
    """Load the lead conversion model from the project root (.pkl file)."""
    global model
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(backend_dir)

    # Prioritize loading the .pkl model located at the project root
    candidate_paths = [
        os.path.join(project_root, "lead_conversion_model (1).pkl"),
        os.path.join(project_root, "lead_conversion_model.pkl"),
        os.path.join(backend_dir, "..", "lead_conversion_model (1).pkl"),
        os.path.join(backend_dir, "..", "lead_conversion_model.pkl"),
        os.path.join(os.getcwd(), "lead_conversion_model (1).pkl"),
        os.path.join(os.getcwd(), "lead_conversion_model.pkl"),
        # Fallback to backend/models directory
        os.path.join(backend_dir, "models", "lead_conversion_model (1).pkl"),
        os.path.join(backend_dir, "models", "lead_conversion_model.pkl"),
        os.path.join(backend_dir, "lead_conversion_model (1).pkl"),
        os.path.join(backend_dir, "lead_conversion_model.pkl"),
    ]

    model_path = None
    for path in candidate_paths:
        norm_path = os.path.normpath(path)
        if os.path.exists(norm_path):
            model_path = norm_path
            break

    if not model_path:
        raise FileNotFoundError("Lead conversion model file (.pkl) not found in project root or backend/models.")

    print(f"Loading lead conversion model from: {model_path}")
    model = joblib.load(model_path)
    feature_count = len(model.feature_names_in_) if hasattr(model, "feature_names_in_") else "unknown"
    print(f"Lead conversion model loaded successfully with {feature_count} features.")
    return model


app = Flask(__name__)

# Enable CORS for frontend integration
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the ML model at startup
load_model()


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint to confirm service status."""
    return jsonify({"status": "ok"}), 200


def parse_numeric(val):
    """Parse numeric fields safely: empty string, None, or invalid returns None."""
    if val is None or val == "":
        return None
    try:
        num = float(val)
        if np.isnan(num) or num < 0:
            return None
        return num
    except (ValueError, TypeError):
        return None


def parse_categorical(val):
    """Parse categorical values safely: coerce empty/sentinel strings to None."""
    if val is None:
        return None
    val_str = str(val).strip()
    if val_str in ("", "not_provided", "Not provided", "null", "None", "Unknown", "unknown"):
        return None
    return val_str


@app.route("/predict", methods=["POST"])
def predict_lead():
    """
    Predict lead conversion probability, lead score (0-100), and priority tier (Low/Medium/High).
    Calls the calibrated pipeline's predict_proba() directly after converting null values to NaN.
    """
    global model
    if model is None:
        return jsonify({"detail": "ML Model is not loaded or unavailable."}), 503

    try:
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            data = {}

        # Map and sanitize input features matching the exact 21 features of the new pipeline
        features_dict = {
            "TotalVisits": parse_numeric(data.get("TotalVisits")),
            "Total Time Spent on Website": parse_numeric(data.get("Total Time Spent on Website")),
            "Page Views Per Visit": parse_numeric(data.get("Page Views Per Visit")),
            "Lead Origin": parse_categorical(data.get("Lead Origin")),
            "Lead Source": parse_categorical(data.get("Lead Source")),
            "Do Not Email": parse_categorical(data.get("Do Not Email")),
            "Do Not Call": parse_categorical(data.get("Do Not Call")),
            "Country": parse_categorical(data.get("Country")),
            "Specialization": parse_categorical(data.get("Specialization")),
            "How did you hear about X Education": parse_categorical(data.get("How did you hear about X Education")),
            "What is your current occupation": parse_categorical(data.get("What is your current occupation")),
            "What matters most to you in choosing a course": parse_categorical(data.get("What matters most to you in choosing a course")),
            "Search": parse_categorical(data.get("Search")),
            "Newspaper Article": parse_categorical(data.get("Newspaper Article")),
            "X Education Forums": parse_categorical(data.get("X Education Forums")),
            "Newspaper": parse_categorical(data.get("Newspaper")),
            "Digital Advertisement": parse_categorical(data.get("Digital Advertisement")),
            "Through Recommendations": parse_categorical(data.get("Through Recommendations")),
            "City": parse_categorical(data.get("City")),
            "A free copy of Mastering The Interview": parse_categorical(data.get("A free copy of Mastering The Interview")),
            "Last Notable Activity": parse_categorical(data.get("Last Notable Activity")),
        }

        # Convert input into a single-row DataFrame matching the exact pipeline feature schema
        input_df = pd.DataFrame([features_dict])

        # Numerical features: convert null/empty values to np.nan and enforce float dtype
        num_cols = ["TotalVisits", "Total Time Spent on Website", "Page Views Per Visit"]
        for col in num_cols:
            if col in input_df.columns:
                input_df[col] = pd.to_numeric(input_df[col], errors="coerce").astype(float)

        # Categorical features: convert null/None values to np.nan for SimpleImputer
        cat_cols = [
            "Lead Origin",
            "Lead Source",
            "Do Not Email",
            "Do Not Call",
            "Country",
            "Specialization",
            "How did you hear about X Education",
            "What is your current occupation",
            "What matters most to you in choosing a course",
            "Search",
            "Newspaper Article",
            "X Education Forums",
            "Newspaper",
            "Digital Advertisement",
            "Through Recommendations",
            "City",
            "A free copy of Mastering The Interview",
            "Last Notable Activity",
        ]
        for col in cat_cols:
            if col in input_df.columns:
                input_df[col] = input_df[col].replace({None: np.nan})

        # Ensure the DataFrame contains only the exact feature schema expected by the saved pipeline
        if hasattr(model, "feature_names_in_"):
            input_df = input_df.reindex(columns=model.feature_names_in_)

        # Directly invoke the pipeline's predict_proba (preprocessing & imputation handled internally by pipeline)
        probabilities = model.predict_proba(input_df)
        conversion_prob = float(probabilities[0][1])

        # Lead Score (0 - 100)
        lead_score = round(conversion_prob * 100, 2)

        # Priority categorization
        if lead_score >= 70.0:
            priority = "High"
        elif lead_score >= 40.0:
            priority = "Medium"
        else:
            priority = "Low"

        return jsonify({
            "conversion_probability": round(conversion_prob, 4),
            "lead_score": lead_score,
            "priority": priority,
        }), 200

    except Exception as e:
        return jsonify({"detail": f"Prediction error: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=False)
