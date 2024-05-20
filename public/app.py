from flask import Flask, request, jsonify, session, send_from_directory
from werkzeug.security import check_password_hash
import os

app = Flask(__name__, static_folder='.', template_folder='.')
app.secret_key = 'your_secret_key'  # Replace with your own secret key

# Read the hashed password from a file
with open('hashed_password.txt', 'r') as f:
    hashed_password = f.read().strip()

@app.route('/check_password', methods=['POST'])
def check_password():
    data = request.json
    if check_password_hash(hashed_password, data.get('password')):
        session['authenticated'] = True
        return jsonify({"authenticated": True}), 200
    return jsonify({"authenticated": False}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('authenticated', None)
    return jsonify({"authenticated": False}), 200

@app.route('/')
def root():
    return send_from_directory('.', 'home.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)
