import os
import glob
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

# Global reference for the loaded pipeline
pipeline = None


def load_pipeline():
    """
    Locate and load the trained pipeline from backend/models/.
    Uses a robust relative path based on the location of this script.
    """
    global pipeline
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    models_dir = os.path.join(backend_dir, "models")

    if not os.path.exists(models_dir):
        raise FileNotFoundError(f"Models directory not found at: {models_dir}")

    # Search for candidate .pkl files inside backend/models/
    candidate_names = [
        "lead_conversion_model (1).pkl",
        "lead_conversion_model.pkl",
    ]
    model_path = None
    for name in candidate_names:
        candidate_path = os.path.join(models_dir, name)
        if os.path.exists(candidate_path):
            model_path = candidate_path
            break

    # Fallback to any .pkl inside backend/models/ if specific filename is not matched
    if not model_path:
        pkl_files = glob.glob(os.path.join(models_dir, "*.pkl"))
        if pkl_files:
            model_path = pkl_files[0]

    if not model_path:
        raise FileNotFoundError("Pipeline model (.pkl) not found inside backend/models/ directory.")

    print(f"Loading pipeline from: {model_path}")
    pipeline = joblib.load(model_path)
    feature_count = len(pipeline.feature_names_in_) if hasattr(pipeline, "feature_names_in_") else "unknown"
    print(f"Pipeline successfully loaded with {feature_count} features.")
    return pipeline


app = Flask(__name__)

# Enable CORS for local development and deployed Vercel frontend
CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3000",
                "https://lead-score-ai.vercel.app",
                "*",
            ]
        }
    },
)

# Load pipeline at application startup
try:
    load_pipeline()
except Exception as e:
    print(f"Warning: Failed to load pipeline at startup: {e}")


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint to confirm API status and model availability."""
    return jsonify({
        "status": "ok",
        "pipeline_loaded": pipeline is not None
    }), 200


@app.route("/predict", methods=["POST"])
def predict():
    """
    Receive lead attributes, convert into DataFrame with expected feature names,
    pass directly to pipeline.predict_proba(), and return conversion score.
    """
    global pipeline
    if pipeline is None:
        try:
            load_pipeline()
        except Exception as e:
            return jsonify({"detail": f"Model pipeline is unavailable: {str(e)}"}), 503

    try:
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return jsonify({"detail": "Invalid JSON body provided. Expected a JSON object."}), 400

        # Retrieve the exact list of expected feature names from the saved pipeline
        if hasattr(pipeline, "feature_names_in_"):
            expected_features = list(pipeline.feature_names_in_)
        else:
            expected_features = [
                "Lead Origin",
                "Lead Source",
                "Do Not Email",
                "Do Not Call",
                "TotalVisits",
                "Total Time Spent on Website",
                "Page Views Per Visit",
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

        # Extract features from input JSON mapped to the exact feature names
        row_data = {}
        for feature in expected_features:
            val = data.get(feature)
            # Normalize empty/sentinel values to None/NaN so SimpleImputer handles them natively
            if val in ("", "not_provided", "Not provided", "null", "None", "Unknown", "unknown", None):
                row_data[feature] = np.nan
            else:
                row_data[feature] = val

        # Construct DataFrame matching pipeline's exact feature names and order
        input_df = pd.DataFrame([row_data], columns=expected_features)

        # Convert numeric columns to numeric dtype (safely parsing strings/empty values as NaN)
        numeric_cols = ["TotalVisits", "Total Time Spent on Website", "Page Views Per Visit"]
        for col in numeric_cols:
            if col in input_df.columns:
                input_df[col] = pd.to_numeric(input_df[col], errors="coerce")

        # Pass DataFrame directly to the trained pipeline (pipeline handles imputation, encoding, scaling, and classification)
        probabilities = pipeline.predict_proba(input_df)
        conversion_probability = float(probabilities[0][1])
        lead_score = round(conversion_probability * 100, 2)

        # Determine priority tier based on calculated lead score
        if lead_score >= 70:
            priority = "High"
        elif lead_score >= 40:
            priority = "Medium"
        else:
            priority = "Low"

        return jsonify({
            "conversion_probability": round(conversion_probability, 4),
            "lead_score": lead_score,
            "priority": priority,
        }), 200

    except Exception as e:
        return jsonify({"detail": f"Prediction error: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=False)
