/*
  # Create Builder Framework Tables

  1. New Tables
    - `variant_reviews`
      - `id` (uuid, primary key)
      - `section_type` (text) - Type of section (hero, story, etc.)
      - `variant_key` (text) - Unique variant identifier
      - `status` (text) - Review status (unreviewed, approved, rejected)
      - `notes` (text, nullable) - Review notes
      - `reviewed_at` (timestamptz, nullable) - When reviewed
      - `reviewed_by` (text, nullable) - Who reviewed it
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `template_customizations`
      - `id` (uuid, primary key)
      - `template_id` (text) - Reference to template
      - `sections` (jsonb) - Customized section configuration
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (builder framework is read-only for now)
    - Add policies for authenticated write access

  3. Indexes
    - Index on variant_reviews (section_type, variant_key) for fast lookup
    - Index on template_customizations (template_id) for template retrieval
*/

CREATE TABLE IF NOT EXISTS variant_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type text NOT NULL,
  variant_key text NOT NULL,
  status text NOT NULL DEFAULT 'unreviewed',
  notes text,
  reviewed_at timestamptz,
  reviewed_by text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(section_type, variant_key)
);

CREATE TABLE IF NOT EXISTS template_customizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id text NOT NULL,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_variant_reviews_lookup 
  ON variant_reviews(section_type, variant_key);

CREATE INDEX IF NOT EXISTS idx_template_customizations_template_id 
  ON template_customizations(template_id);

ALTER TABLE variant_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_customizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read variant reviews"
  ON variant_reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert variant reviews"
  ON variant_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update variant reviews"
  ON variant_reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can read template customizations"
  ON template_customizations
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert template customizations"
  ON template_customizations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update template customizations"
  ON template_customizations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
