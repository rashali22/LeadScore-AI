import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

# Global reference for the loaded ML model
model = None


def load_model():
    """Load the lead conversion model once at application startup."""
    global model
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "models", "lead_conversion_model.pkl")

    if not os.path.exists(model_path):
        model_path = os.path.join(base_dir, "lead_conversion_model.pkl")

    print(f"Loading lead conversion model from: {model_path}")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")

    model = joblib.load(model_path)
    print("Lead conversion model loaded successfully.")
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

        # Map and sanitize input features
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
            "Lead Quality": parse_categorical(data.get("Lead Quality")),
            "City": parse_categorical(data.get("City")),
            "A free copy of Mastering The Interview": parse_categorical(data.get("A free copy of Mastering The Interview")),
        }

        # Convert input into a single-row DataFrame matching the exact pipeline feature schema
        input_df = pd.DataFrame([features_dict])

        # Numerical features: convert null/empty values to np.nan and enforce float dtype
        num_cols = ["TotalVisits", "Total Time Spent on Website", "Page Views Per Visit"]
        for col in num_cols:
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
            "Lead Quality",
            "City",
            "A free copy of Mastering The Interview",
        ]
        for col in cat_cols:
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
