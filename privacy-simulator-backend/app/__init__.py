from flask import Flask
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app

cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow cross-origin requests

    from .routes import main
    app.register_blueprint(main)  # ✅ This registers /submit etc.

    return app
