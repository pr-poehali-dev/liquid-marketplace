CREATE TABLE IF NOT EXISTS t_p56592739_liquid_marketplace.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'buyer',
  status TEXT NOT NULL DEFAULT 'active',
  rating NUMERIC(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS t_p56592739_liquid_marketplace.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  parent_id TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS t_p56592739_liquid_marketplace.lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.users(id),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(15,2) NOT NULL,
  price_label TEXT,
  category_id TEXT REFERENCES t_p56592739_liquid_marketplace.categories(id),
  lot_type TEXT NOT NULL DEFAULT 'product',
  location TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'moderation',
  views INT DEFAULT 0,
  days_published INT DEFAULT 7,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS t_p56592739_liquid_marketplace.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lot_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.lots(id),
  buyer_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.users(id),
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS t_p56592739_liquid_marketplace.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.bookings(id),
  reviewer_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.users(id),
  seller_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.users(id),
  rating INT NOT NULL,
  text TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS t_p56592739_liquid_marketplace.favorites (
  user_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.users(id),
  lot_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.lots(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, lot_id)
);

CREATE TABLE IF NOT EXISTS t_p56592739_liquid_marketplace.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES t_p56592739_liquid_marketplace.users(id),
  status TEXT NOT NULL DEFAULT 'active',
  amount NUMERIC(10,2) NOT NULL DEFAULT 500,
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days')
);

CREATE TABLE IF NOT EXISTS t_p56592739_liquid_marketplace.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS lots_seller_idx ON t_p56592739_liquid_marketplace.lots(seller_id);
CREATE INDEX IF NOT EXISTS lots_status_idx ON t_p56592739_liquid_marketplace.lots(status);
CREATE INDEX IF NOT EXISTS lots_created_idx ON t_p56592739_liquid_marketplace.lots(created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_buyer_idx ON t_p56592739_liquid_marketplace.bookings(buyer_id);
CREATE INDEX IF NOT EXISTS bookings_lot_idx ON t_p56592739_liquid_marketplace.bookings(lot_id);