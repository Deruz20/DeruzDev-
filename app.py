import os
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import bcrypt
from dotenv import load_dotenv
import uuid
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

load_dotenv()

app = Flask(__name__, template_folder='templates')

# --- Configuration ---
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY', 'default-super-secret-key-change-me')
jwt = JWTManager(app)
db = SQLAlchemy(app)

# --- Database Models ---
class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True, nullable=False)
    hashed_password = db.Column(db.String, nullable=False)

# --- API Routes ---
@app.route("/api/register", methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        email, password, name = data.get('email'), data.get('password'), data.get('name')
        if not all([email, password, name]): return jsonify({"error": "Missing required fields"}), 400
        if User.query.filter_by(email=email).first(): return jsonify({"error": "User with this email already exists"}), 409

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        new_user = User(id=str(uuid.uuid4()), name=name, email=email, hashed_password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/login", methods=['POST'])
def login_user():
    data = request.get_json()
    email, password = data.get('email'), data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.checkpw(password.encode('utf-8'), user.hashed_password.encode('utf-8')):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/stats")
@jwt_required()
def get_stats():
    stats = { "totalRevenue": 15750.25, "netProfit": 8320.50, "totalExpenses": 7429.75 }
    return jsonify(stats)

# --- Frontend Routes ---
@app.route("/")
def serve_index():
    return send_from_directory('templates', 'index.html')

@app.route("/dashboard")
def serve_dashboard():
    return send_from_directory('templates', 'dashboard.html')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
