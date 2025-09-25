from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os
import secrets
import logging

# ---------------- Logging Setup ----------------
logging.basicConfig(level=logging.DEBUG, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

# ---------------- Flask App ----------------
# app = Flask(__name__)
# CORS(app, origins=["https://calm-app-frontend.onrender.com"])

# Load .env (only works locally, Render uses environment variables)
load_dotenv()


# MongoDB connection
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
logger.info(f"MONGO_URI being used: {app.config['MONGO_URI']}")

mongo = None
try:
    mongo = PyMongo(app)
    logger.info("✅ PyMongo initialized")
    logger.info(f"mongo.db object: {mongo.db}")
except Exception as e:
    logger.error(f"❌ Failed to initialize PyMongo: {e}")

# ---------------- Routes ----------------
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.json
#     logger.debug(f"📩 Signup request payload: {data}")

#     if not mongo or not mongo.db:
#         logger.error("❌ Database not connected in /signup")
#         return jsonify({'error': 'Database not connected'}), 500

#     users = mongo.db.users
#     if users.find_one({'email': data['email']}):
#         return jsonify({'message': 'Email already exists'}), 400

#     hashed_password = generate_password_hash(data['password'])
#     users.insert_one({
#         'username': data['username'],
#         'email': data['email'],
#         'password_hash': hashed_password
#     })
#     logger.info(f"✅ User created: {data['email']}")
#     return jsonify({'message': 'User created successfully'})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    app.logger.debug(f"📩 Signup payload: {data}")

    if not mongo or not mongo.db:
        return jsonify({'error': 'Database not connected'}), 500

    users = mongo.db.users
    try:
        if users.find_one({'email': data['email']}):
            return jsonify({'error': 'Email already exists'}), 400

        hashed_password = generate_password_hash(data['password'])
        users.insert_one({
            'username': data['username'],
            'email': data['email'],
            'password_hash': hashed_password
        })
        return jsonify({'message': 'User created successfully'})
    except Exception as e:
        app.logger.error(f"❌ Error in signup: {e}")
        return jsonify({'error': 'Server error', 'details': str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    logger.debug(f"📩 Login request payload: {data}")

    if not mongo or not mongo.db:
        logger.error("❌ Database not connected in /login")
        return jsonify({'error': 'Database not connected'}), 500

    users = mongo.db.users
    user = users.find_one({'email': data['email']})
    if user and check_password_hash(user['password_hash'], data['password']):
        logger.info(f"✅ Login successful for: {data['email']}")
        return jsonify({'message': 'Login successful', 'username': user['username'], 'email': user['email']})

    logger.warning(f"⚠️ Invalid login attempt for: {data['email']}")
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/prompt', methods=['POST'])
def prompt():
    data = request.json
    logger.debug(f"📩 Prompt request: {data}")

    if not mongo or not mongo.db:
        return jsonify({'error': 'Database not connected'}), 500

    user_email = str(data.get('email', ''))
    prompt_text = data.get('prompt', '')

    mongo.db.prompts.insert_one({
        'prompt': prompt_text,
        'email': user_email,
    })

    return jsonify({'response': f'You said: {prompt_text}'})

@app.route('/prompt-history', methods=['GET'])
def prompt_history():
    email = request.args.get('email', '')
    logger.debug(f"📩 Prompt history requested for: {email}")

    if not mongo or not mongo.db:
        return jsonify({'error': 'Database not connected'}), 500

    prompts = list(mongo.db.prompts.find({'email': str(email)}, {'_id': 0}))
    return jsonify(prompts)

@app.route('/delete-prompts', methods=['DELETE'])
def delete_prompts():
    data = request.json
    email = data.get('email', '')
    logger.debug(f"📩 Delete prompts request for: {email}")

    if not mongo or not mongo.db:
        return jsonify({'error': 'Database not connected'}), 500

    result = mongo.db.prompts.delete_many({'email': str(email)})
    logger.info(f"🗑️ Deleted {result.deleted_count} prompts for: {email}")
    return jsonify({'message': f'Deleted {result.deleted_count} prompts'})

@app.route('/')
def index():
    return "✅ Calm App backend is running!"

@app.route('/api/endpoint', methods=['GET'])
def api_endpoint():
    return jsonify({"message": "This is a test endpoint!"})

# ---------------- Run ----------------
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"🚀 Starting server on port {port}")
    app.run(host="0.0.0.0", port=port)
