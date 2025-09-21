from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os
import secrets

app = Flask(__name__)
CORS(app, origins=["https://calm-app-frontend.onrender.com"])


load_dotenv()  # This loads variables from .env into environment

SECRET_KEY = secrets.token_hex(24)
# Now use them like this:
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

if not app.config["MONGO_URI"]:
    raise Exception("MONGO_URI is not set in environment variables")

app.secret_key = os.environ.get("SECRET_KEY")
mongo = PyMongo(app)
users = mongo.db.users

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if users.find_one({'email': data['email']}):
        return jsonify({'message': 'Email already exists'}), 400
    hashed_password = generate_password_hash(data['password'])
    users.insert_one({
        'username': data['username'],
        'email': data['email'],
        'password_hash': hashed_password
    })
    return jsonify({'message': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = users.find_one({'email': data['email']})
    if user and check_password_hash(user['password_hash'], data['password']):
        return jsonify({'message': 'Login successful', 'username': user['username'], 'email': user['email']})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/prompt', methods=['POST'])
def prompt():
    data = request.json
    prompt_text = data.get('prompt', '')
    user_email = str(data.get('email', ''))  # Ensure email is always a string

    # Store prompt in the 'prompts' collection
    prompt_doc = {
        'prompt': prompt_text,
        'email': user_email,
    }
    mongo.db.prompts.insert_one(prompt_doc)

    # For demo, just echo the prompt. Replace with AI logic as needed.
    return jsonify({'response': f'You said: {prompt_text}'})

@app.route('/prompt-history', methods=['GET'])
def prompt_history():
    email = request.args.get('email', '')
    prompts = list(mongo.db.prompts.find({'email': str(email)}, {'_id': 0}))
    return jsonify(prompts)

@app.route('/')
def index():
    return "Calm App backend is running!"

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)

# localStorage.setItem("userEmail", data.email); # data.email from backend response
print(secrets.token_hex(24))