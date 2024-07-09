from datetime import datetime, timedelta

import jwt
from django.conf import settings

SECRET_KEY = settings.SECRET_KEY


def generate_activation_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=24)  # Token expires in 24 hours
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token


def decode_activation_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


token = generate_activation_token(12)
user_id = decode_activation_token(token)
