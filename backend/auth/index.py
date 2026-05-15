"""Регистрация и авторизация пользователей ЛИКВИД"""
import json
import os
import hashlib
import hmac
import uuid
import psycopg2

SCHEMA = 't_p56592739_liquid_marketplace'
CORS = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token'}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def make_token(user_id: str) -> str:
    secret = os.environ.get('JWT_SECRET', 'likv_secret_2026')
    return hmac.new(secret.encode(), user_id.encode(), hashlib.sha256).hexdigest()

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    path = event.get('path', '/')
    body = json.loads(event.get('body') or '{}')

    # POST /register
    if path.endswith('/register'):
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')
        name = body.get('name', '').strip()
        role = body.get('role', 'buyer')

        if not email or not password or not name:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Заполните все поля'})}

        if role not in ('buyer', 'seller'):
            role = 'buyer'

        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = %s", (email,))
            if cur.fetchone():
                return {'statusCode': 409, 'headers': CORS, 'body': json.dumps({'error': 'Email уже используется'})}

            user_id = str(uuid.uuid4())
            cur.execute(
                f"INSERT INTO {SCHEMA}.users (id, email, password_hash, name, role) VALUES (%s, %s, %s, %s, %s)",
                (user_id, email, hash_password(password), name, role)
            )
            conn.commit()
            token = make_token(user_id)
            return {'statusCode': 201, 'headers': CORS, 'body': json.dumps({'user_id': user_id, 'token': token, 'name': name, 'role': role})}
        finally:
            cur.close(); conn.close()

    # POST /login
    if path.endswith('/login'):
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(f"SELECT id, name, role, status, rating, review_count FROM {SCHEMA}.users WHERE email = %s AND password_hash = %s", (email, hash_password(password)))
            row = cur.fetchone()
            if not row:
                return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный email или пароль'})}
            user_id, name, role, status, rating, review_count = row
            if status == 'blocked':
                return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Аккаунт заблокирован'})}
            token = make_token(str(user_id))
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'user_id': str(user_id), 'token': token, 'name': name, 'role': role, 'rating': float(rating or 0), 'review_count': review_count})}
        finally:
            cur.close(); conn.close()

    return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}
