/*
  # Initial Schema for StartUpLegal Application

  1. New Tables
    - `profiles` - User profile information extending Supabase auth.users
    - `industries` - Available industry types
    - `compliance_questions` - All compliance questions with metadata
    - `user_responses` - User responses to compliance questions
    - `compliance_items` - Generated compliance items for users
    - `onboarding_sessions` - Track user onboarding progress

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for reading reference data (industries, questions)

  3. Functions
    - Function to generate compliance items based on user responses
*/

-- Create custom types
CREATE TYPE industry_type AS ENUM (
  'Technology',
  'Financial Services', 
  'Healthcare',
  'Education',
  'Manufacturing',
  'Agriculture',
  'Transport & Logistics',
  'Construction',
  'Hospitality & Tourism',
  'Mining',
  'Professional Services'
);

CREATE TYPE compliance_type AS ENUM ('Required', 'Recommended', 'Optional');
CREATE TYPE response_type AS ENUM ('Yes', 'No', 'NotApplicable');
CREATE TYPE item_status AS ENUM ('Completed', 'Pending');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  company text,
  industry industry_type,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Industries reference table
CREATE TABLE IF NOT EXISTS industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name industry_type UNIQUE NOT NULL,
  label text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Compliance questions
CREATE TABLE IF NOT EXISTS compliance_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_key text UNIQUE NOT NULL,
  question text NOT NULL,
  industry industry_type, -- NULL for general questions
  compliance_requirement text NOT NULL,
  implementation_steps text NOT NULL,
  documentation_required text NOT NULL,
  submission_details text NOT NULL,
  deadlines_renewals text NOT NULL,
  law_requirement text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User responses to questions
CREATE TABLE IF NOT EXISTS user_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id uuid REFERENCES compliance_questions(id) ON DELETE CASCADE NOT NULL,
  response response_type NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Generated compliance items for users
CREATE TABLE IF NOT EXISTS compliance_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  type compliance_type NOT NULL DEFAULT 'Required',
  status item_status NOT NULL DEFAULT 'Pending',
  industry industry_type,
  document_url text,
  official_site_url text,
  question_id uuid REFERENCES compliance_questions(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Onboarding sessions
CREATE TABLE IF NOT EXISTS onboarding_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  current_step integer DEFAULT 1,
  industry industry_type,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policies for industries (public read)
CREATE POLICY "Anyone can read industries"
  ON industries
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for compliance questions (public read)
CREATE POLICY "Anyone can read compliance questions"
  ON compliance_questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user responses
CREATE POLICY "Users can manage own responses"
  ON user_responses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for compliance items
CREATE POLICY "Users can manage own compliance items"
  ON compliance_items
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for onboarding sessions
CREATE POLICY "Users can manage own onboarding session"
  ON onboarding_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert initial industries data
INSERT INTO industries (name, label, description) VALUES
  ('Technology', 'Technology', 'Software, IT services, and technology companies'),
  ('Financial Services', 'Financial Services', 'Banks, insurance, fintech, and financial institutions'),
  ('Healthcare', 'Healthcare', 'Medical services, pharmaceuticals, and health technology'),
  ('Education', 'Education', 'Schools, universities, and educational services'),
  ('Manufacturing', 'Manufacturing', 'Production and manufacturing companies'),
  ('Agriculture', 'Agriculture', 'Farming, food production, and agricultural services'),
  ('Transport & Logistics', 'Transport & Logistics', 'Transportation and logistics companies'),
  ('Construction', 'Construction', 'Construction and building services'),
  ('Hospitality & Tourism', 'Hospitality & Tourism', 'Hotels, restaurants, and tourism services'),
  ('Mining', 'Mining', 'Mining and extraction industries'),
  ('Professional Services', 'Professional Services', 'Legal, consulting, and professional services')
ON CONFLICT (name) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_questions_updated_at BEFORE UPDATE ON compliance_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_responses_updated_at BEFORE UPDATE ON user_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_items_updated_at BEFORE UPDATE ON compliance_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_onboarding_sessions_updated_at BEFORE UPDATE ON onboarding_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();