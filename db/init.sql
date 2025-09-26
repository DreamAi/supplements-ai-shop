-- basic schema for products, customers, orders, order_items, tickets
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  short TEXT,
  long TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_uid TEXT UNIQUE,
  customer_id INTEGER REFERENCES customers(id),
  total_amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'zar',
  status TEXT DEFAULT 'pending',
  payment_intent_id TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id TEXT,
  qty INTEGER,
  unit_price INTEGER
);

CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  type TEXT, -- 'refund','medical','support'
  priority TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'open',
  payload JSONB,
  created_at TIMESTAMP DEFAULT now()
);
