-- 1. Create News Table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'published',
    features JSONB DEFAULT '[]',
    specs JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Leads (Inquiries) Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL, -- 'contact' or 'sample_request'
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT,
    product_id TEXT, -- For sample requests
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create CMS Assets Table (for simple key-value settings like banners)
CREATE TABLE IF NOT EXISTS public.cms_assets (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (Initial simple rules, you should harden these later)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_assets ENABLE ROW LEVEL SECURITY;

-- Allow public read access to content
CREATE POLICY "Allow public read access to news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read access to cms_assets" ON public.cms_assets FOR SELECT USING (true);

-- Allow public write access to leads (to receive inquiries)
CREATE POLICY "Allow public insert access to leads" ON public.leads FOR INSERT WITH CHECK (true);
