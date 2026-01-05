-- =========================================
-- SCHÉMA DE BASE DE DONNÉES POUR ASAF
-- Application React + Supabase
-- =========================================

-- =========================================
-- 1. EXTENSIONS NÉCESSAIRES
-- =========================================

-- Extension pour les UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- 2. TABLE UTILISATEURS (AUTHENTIFICATION)
-- =========================================

-- Table profiles pour étendre auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 3. TABLE PRINCIPALE DES CONTENUS
-- =========================================

-- Table posts pour tous les types de contenu
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('about', 'programme', 'evenement', 'news', 'donation')),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  date DATE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  image_url TEXT,
  image_alt TEXT,
  author_id UUID REFERENCES profiles(id),
  tags TEXT[],
  category TEXT,
  priority INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 4. TABLES SPÉCIFIQUES PAR MODULE
-- =========================================

-- Table pour les programmes spécifiques
CREATE TABLE IF NOT EXISTS programmes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  duration TEXT,
  location TEXT,
  target_audience TEXT,
  objectives TEXT[],
  requirements TEXT,
  contact_info JSONB,
  registration_deadline DATE,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les événements
CREATE TABLE IF NOT EXISTS evenements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT NOT NULL,
  address TEXT,
  city TEXT,
  country TEXT,
  coordinates POINT,
  organizer TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  registration_required BOOLEAN DEFAULT false,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  event_type TEXT CHECK (event_type IN ('conference', 'workshop', 'formation', 'reunion', 'autre')),
  price DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'XAF',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les dons
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  donor_name TEXT,
  donor_email TEXT,
  donor_phone TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'XAF',
  payment_method TEXT CHECK (payment_method IN ('cash', 'mobile_money', 'bank_transfer', 'card')),
  payment_reference TEXT,
  donation_type TEXT DEFAULT 'general' CHECK (donation_type IN ('general', 'programme', 'urgence', 'mensuel')),
  programme_id UUID REFERENCES programmes(id),
  is_anonymous BOOLEAN DEFAULT false,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour la newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  preferences TEXT[] DEFAULT ARRAY['general'],
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les contacts/messages
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'support', 'partnership', 'complaint', 'suggestion')),
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to UUID REFERENCES profiles(id),
  response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 5. TABLES DE RELATION ET MÉTADONNÉES
-- =========================================

-- Table pour les tags
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table de liaison posts-tags
CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Table pour les médias
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 6. INDEXES POUR LES PERFORMANCES
-- =========================================

-- Indexes pour posts
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Indexes pour programmes
CREATE INDEX IF NOT EXISTS idx_programmes_post_id ON programmes(post_id);

-- Indexes pour événements
CREATE INDEX IF NOT EXISTS idx_evenements_post_id ON evenements(post_id);
CREATE INDEX IF NOT EXISTS idx_evenements_date ON evenements(event_date);
CREATE INDEX IF NOT EXISTS idx_evenements_location ON evenements(location);

-- Indexes pour dons
CREATE INDEX IF NOT EXISTS idx_donations_date ON donations(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_type ON donations(donation_type);

-- Indexes pour contacts
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_category ON contacts(category);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- =========================================
-- 7. POLITIQUES RLS (ROW LEVEL SECURITY)
-- =========================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE evenements ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Politiques pour profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Politiques pour posts
CREATE POLICY "Published posts are viewable by everyone" ON posts FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users can view all posts" ON posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Editors and admins can manage posts" ON posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Politiques pour programmes
CREATE POLICY "Programmes are viewable by everyone" ON programmes FOR SELECT USING (true);
CREATE POLICY "Admins can manage programmes" ON programmes FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Politiques pour événements
CREATE POLICY "Events are viewable by everyone" ON evenements FOR SELECT USING (true);
CREATE POLICY "Admins can manage events" ON evenements FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Politiques pour dons
CREATE POLICY "Users can view their own donations" ON donations FOR SELECT USING (auth.uid()::text = donor_email OR is_anonymous = false);
CREATE POLICY "Admins can view all donations" ON donations FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Anyone can create donations" ON donations FOR INSERT WITH CHECK (true);

-- Politiques pour newsletter
CREATE POLICY "Users can manage their own subscription" ON newsletter_subscriptions FOR ALL USING (auth.email() = email);
CREATE POLICY "Admins can view all subscriptions" ON newsletter_subscriptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Politiques pour contacts
CREATE POLICY "Anyone can create contact messages" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage contacts" ON contacts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Politiques pour médias
CREATE POLICY "Authenticated users can view media" ON media FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Editors and admins can manage media" ON media FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- =========================================
-- 8. FONCTIONS ET TRIGGERS
-- =========================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programmes_updated_at BEFORE UPDATE ON programmes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_evenements_updated_at BEFORE UPDATE ON evenements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour générer automatiquement le slug
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Trigger pour générer le slug automatiquement
CREATE OR REPLACE FUNCTION set_post_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug := generate_slug(NEW.title);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_post_slug_trigger BEFORE INSERT OR UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION set_post_slug();

-- =========================================
-- 9. DONNÉES DE TEST/INITIALES
-- =========================================

-- Insertion de tags de base
INSERT INTO tags (name, slug, description, color) VALUES
('Formation', 'formation', 'Activités de formation', '#3B82F6'),
('Sensibilisation', 'sensibilisation', 'Campagnes de sensibilisation', '#10B981'),
('Autonomisation', 'autonomisation', 'Programmes d''autonomisation', '#F59E0B'),
('Inclusion', 'inclusion', 'Activités d''inclusion sociale', '#8B5CF6'),
('Droits', 'droits', 'Protection des droits', '#EF4444')
ON CONFLICT (slug) DO NOTHING;

-- Insertion d'un profil admin de base (à adapter selon vos besoins)
-- Note: Cette insertion nécessite un utilisateur existant dans auth.users

-- =========================================
-- 10. VUES UTILES
-- =========================================

-- Vue pour les statistiques générales
CREATE OR REPLACE VIEW site_stats AS
SELECT
  (SELECT COUNT(*) FROM posts WHERE status = 'published') as total_posts,
  (SELECT COUNT(*) FROM programmes) as total_programmes,
  (SELECT COUNT(*) FROM evenements WHERE event_date >= NOW()) as upcoming_events,
  (SELECT COUNT(*) FROM donations WHERE status = 'completed') as total_donations,
  (SELECT COALESCE(SUM(amount), 0) FROM donations WHERE status = 'completed') as total_donated,
  (SELECT COUNT(*) FROM newsletter_subscriptions WHERE is_active = true) as active_subscribers,
  (SELECT COUNT(*) FROM contacts WHERE status = 'unread') as unread_messages;

-- Vue pour les posts avec détails complets
CREATE OR REPLACE VIEW posts_detailed AS
SELECT
  p.*,
  pr.name as author_name,
  pr.role as author_role,
  array_agg(t.name) as tag_names,
  CASE
    WHEN p.type = 'programme' THEN json_build_object('duration', prog.duration, 'location', prog.location)
    WHEN p.type = 'evenement' THEN json_build_object('event_date', e.event_date, 'location', e.location)
    ELSE NULL
  END as type_details
FROM posts p
LEFT JOIN profiles pr ON p.author_id = pr.id
LEFT JOIN post_tags pt ON p.id = pt.post_id
LEFT JOIN tags t ON pt.tag_id = t.id
LEFT JOIN programmes prog ON p.id = prog.post_id AND p.type = 'programme'
LEFT JOIN evenements e ON p.id = e.post_id AND p.type = 'evenement'
GROUP BY p.id, pr.name, pr.role, prog.duration, prog.location, e.event_date, e.location;

-- =========================================
-- FIN DU SCHÉMA
-- =========================================

-- Note: Exécutez ce script dans l'ordre dans votre éditeur SQL Supabase
-- Certaines parties peuvent nécessiter des ajustements selon vos besoins spécifiques
