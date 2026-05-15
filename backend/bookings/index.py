"""Управление бронированиями"""
import json
import os
import uuid
import psycopg2
import psycopg2.extras

SCHEMA = 't_p56592739_liquid_marketplace'
CORS = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token'}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    user_id = event.get('headers', {}).get('X-User-Id', '')

    if not user_id:
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Не авторизован'})}

    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        # GET /bookings — мои бронирования (как покупатель)
        if method == 'GET':
            cur.execute(f"""
                SELECT b.id, b.status, b.message, b.created_at,
                       l.id as lot_id, l.title, l.price, l.images, l.location,
                       u.name as seller_name, u.id as seller_id
                FROM {SCHEMA}.bookings b
                JOIN {SCHEMA}.lots l ON l.id = b.lot_id
                JOIN {SCHEMA}.users u ON u.id = l.seller_id
                WHERE b.buyer_id = %s
                ORDER BY b.created_at DESC
            """, (user_id,))
            rows = cur.fetchall()
            bookings = [{
                'id': str(r['id']),
                'status': r['status'],
                'message': r['message'],
                'createdAt': str(r['created_at'])[:10],
                'lot': {
                    'id': str(r['lot_id']),
                    'title': r['title'],
                    'price': float(r['price']),
                    'images': r['images'] or [],
                    'location': r['location'] or '',
                    'seller': {'id': str(r['seller_id']), 'name': r['seller_name']}
                }
            } for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'bookings': bookings})}

        # POST /bookings — создать бронирование
        if method == 'POST' and not path.endswith('/update'):
            body = json.loads(event.get('body') or '{}')
            lot_id = body.get('lot_id')
            if not lot_id:
                return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'lot_id обязателен'})}
            booking_id = str(uuid.uuid4())
            cur.execute(
                f"INSERT INTO {SCHEMA}.bookings (id, lot_id, buyer_id, message) VALUES (%s, %s, %s, %s)",
                (booking_id, lot_id, user_id, body.get('message', ''))
            )
            conn.commit()
            return {'statusCode': 201, 'headers': CORS, 'body': json.dumps({'booking_id': booking_id})}

        # PUT /bookings/update — сменить статус
        if method == 'PUT' and path.endswith('/update'):
            body = json.loads(event.get('body') or '{}')
            booking_id = body.get('booking_id')
            new_status = body.get('status')
            allowed = ('pending', 'confirmed', 'rejected', 'completed', 'cancelled')
            if new_status not in allowed:
                return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Недопустимый статус'})}
            cur.execute(f"UPDATE {SCHEMA}.bookings SET status = %s, updated_at = now() WHERE id = %s AND buyer_id = %s", (new_status, booking_id, user_id))
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    finally:
        cur.close(); conn.close()

    return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}
