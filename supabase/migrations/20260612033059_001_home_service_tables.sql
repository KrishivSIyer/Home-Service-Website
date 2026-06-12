-- Leads table for contact form and quote submissions
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text,
  estimated_cost numeric,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  source text DEFAULT 'website',
  created_at timestamptz DEFAULT now()
);

-- Appointments table for scheduling
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Chat messages for AI chatbot conversations
CREATE TABLE chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL DEFAULT gen_random_uuid(),
  visitor_name text,
  visitor_email text,
  visitor_phone text,
  service_interest text,
  qualified boolean DEFAULT false,
  lead_captured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Leads policies (public can insert, authenticated can read)
CREATE POLICY "insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_leads" ON leads FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "update_leads" ON leads FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_leads" ON leads FOR DELETE
  TO authenticated USING (true);

-- Appointments policies
CREATE POLICY "insert_appointments" ON appointments FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_appointments" ON appointments FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "update_appointments" ON appointments FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_appointments" ON appointments FOR DELETE
  TO authenticated USING (true);

-- Chat conversations policies
CREATE POLICY "insert_conversations" ON chat_conversations FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_conversations" ON chat_conversations FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "update_conversations" ON chat_conversations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- Chat messages policies
CREATE POLICY "insert_messages" ON chat_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_messages" ON chat_messages FOR SELECT
  TO anon, authenticated USING (conversation_id IN (
    SELECT id FROM chat_conversations WHERE session_id = ((current_setting('request.jwt.claims')::json->>'session_id')::uuid)
  ));
CREATE POLICY "select_messages_auth" ON chat_messages FOR SELECT
  TO authenticated USING (true);
