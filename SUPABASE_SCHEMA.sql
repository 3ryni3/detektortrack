-- Wklej to w Supabase → SQL Editor → New Query → Run

CREATE TABLE community_finds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  depth_cm INTEGER,
  note TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  region TEXT,
  nickname TEXT DEFAULT 'Anonim',
  has_photo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Włącz dostęp publiczny (tylko odczyt i dodawanie, bez usuwania)
ALTER TABLE community_finds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Każdy może czytać" ON community_finds
  FOR SELECT USING (true);

CREATE POLICY "Każdy może dodawać" ON community_finds
  FOR INSERT WITH CHECK (true);
