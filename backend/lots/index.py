"""Управление лотами — получение, создание, просмотр"""
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
    qs = event.get('queryStringParameters') or {}
    user_id = event.get('headers', {}).get('X-User-Id', '')

    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        # GET /lots — список лотов с фильтрами
        if method == 'GET' and not any(path.endswith(x) for x in ['/create', '/my']):
            where = [f"l.status = 'active'"]
            params = []

            if qs.get('category'):
                where.append("l.category_id = %s")
                params.append(qs['category'])
            if qs.get('type'):
                where.append("l.lot_type = %s")
                params.append(qs['type'])
            if qs.get('q'):
                where.append("l.title ILIKE %s")
                params.append(f"%{qs['q']}%")
            if qs.get('price_from'):
                where.append("l.price >= %s")
                params.append(qs['price_from'])
            if qs.get('price_to'):
                where.append("l.price <= %s")
                params.append(qs['price_to'])

            sort = 'l.created_at DESC'
            if qs.get('sort') == 'price_asc':
                sort = 'l.price ASC'
            elif qs.get('sort') == 'price_desc':
                sort = 'l.price DESC'
            elif qs.get('sort') == 'rating':
                sort = 'u.rating DESC'

            limit = min(int(qs.get('limit', 20)), 100)
            offset = int(qs.get('offset', 0))

            sql = f"""
                SELECT l.id, l.title, l.price, l.price_label, l.category_id, l.lot_type,
                       l.location, l.images, l.status, l.views, l.created_at, l.days_published,
                       u.id as seller_id, u.name as seller_name, u.rating as seller_rating, u.review_count
                FROM {SCHEMA}.lots l
                JOIN {SCHEMA}.users u ON u.id = l.seller_id
                WHERE {' AND '.join(where)}
                ORDER BY {sort}
                LIMIT %s OFFSET %s
            """
            params.extend([limit, offset])
            cur.execute(sql, params)
            rows = cur.fetchall()

            lots = []
            for r in rows:
                lots.append({
                    'id': str(r['id']),
                    'title': r['title'],
                    'price': float(r['price']),
                    'priceLabel': r['price_label'],
                    'category': r['category_id'],
                    'type': r['lot_type'],
                    'location': r['location'] or '',
                    'images': r['images'] or [],
                    'status': r['status'],
                    'views': r['views'],
                    'createdAt': str(r['created_at'])[:10],
                    'daysPublished': r['days_published'],
                    'seller': {
                        'id': str(r['seller_id']),
                        'name': r['seller_name'],
                        'rating': float(r['seller_rating'] or 0),
                        'reviewCount': r['review_count'] or 0
                    }
                })
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'lots': lots, 'total': len(lots)})}

        # GET /lots/my — мои лоты
        if method == 'GET' and path.endswith('/my'):
            if not user_id:
                return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Не авторизован'})}
            cur.execute(f"SELECT id, title, price, status, views, created_at FROM {SCHEMA}.lots WHERE seller_id = %s ORDER BY created_at DESC", (user_id,))
            rows = cur.fetchall()
            lots = [{'id': str(r['id']), 'title': r['title'], 'price': float(r['price']), 'status': r['status'], 'views': r['views'], 'createdAt': str(r['created_at'])[:10]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'lots': lots})}

        # POST /lots/create — создать лот
        if method == 'POST' and path.endswith('/create'):
            if not user_id:
                return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Не авторизован'})}
            body = json.loads(event.get('body') or '{}')
            lot_id = str(uuid.uuid4())
            days = int(body.get('days', 7))
            cur.execute(
                f"""INSERT INTO {SCHEMA}.lots (id, seller_id, title, description, price, price_label, category_id, lot_type, location, days_published, expires_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, now() + (%s || ' days')::interval)""",
                (lot_id, user_id, body.get('title'), body.get('description'), body.get('price', 0),
                 body.get('priceLabel'), body.get('category'), body.get('type', 'product'),
                 body.get('location'), days, str(days))
            )
            conn.commit()
            return {'statusCode': 201, 'headers': CORS, 'body': json.dumps({'lot_id': lot_id})}

    finally:
        cur.close(); conn.close()

    return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}
