-- Create the products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  fabric TEXT,
  color TEXT,
  sizes TEXT,
  sku TEXT,
  whatsapp_message TEXT,
  stock_status TEXT DEFAULT 'IN_STOCK',
  is_featured BOOLEAN DEFAULT FALSE,
  images TEXT[] DEFAULT '{}'::TEXT[]
);

-- Set up Storage for product images
-- Note: If you already created a 'products' bucket manually, this will just ensure it's public.
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- Allow public access to read images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'products');

-- Allow public access to insert images (for this prototype admin dashboard)
CREATE POLICY "Public Insert" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'products');
