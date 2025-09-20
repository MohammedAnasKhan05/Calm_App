from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Replace with your MongoDB URI
app.config["MONGO_URI"] = "mongodb://localhost:27017/calm"
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
        return jsonify({'message': 'Login successful', 'username': user['username']})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/prompt', methods=['POST'])
def prompt():
    data = request.json
    prompt_text = data.get('prompt', '')
    # For demo, just echo the prompt. Replace with AI logic as needed.
    return jsonify({'response': f'You said: {prompt_text}'})

if __name__ == '__main__':
    app.run(debug=True)