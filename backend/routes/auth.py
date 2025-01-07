from flask import Blueprint, request, jsonify
from firebase_admin import auth

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    try:
        # Créer un utilisateur Firebase
        user = auth.create_user(
            email=email,
            password=password,
            
        )
        return jsonify({'message': 'User registered successfully', 'user_id': user.uid}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/verify-token', methods=['POST'])
def verify_token():
    token = request.get_json().get('token')

    if not token:
        return jsonify({'error': 'Missing token'}), 401

    try:
        # Vérifier le token Firebase
        decoded_token = auth.verify_id_token(token)
        return jsonify({'message': 'Token is valid', 'user_id': decoded_token['uid']}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 401


@auth_bp.route('/login', methods=['POST'])

def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    try:
        # Se connecter à un utilisateur Firebase
        user = auth.get_user_by_email(email)
        return jsonify({'message': 'User logged in successfully', 'user_id': user.uid}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/delete', methods=['POST'])

def delete():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Missing email'}), 400

    try:
        # Supprimer un utilisateur Firebase
        user = auth.get_user_by_email(email)
        auth.delete_user(user.uid)
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400