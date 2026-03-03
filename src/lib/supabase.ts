import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      variant_reviews: {
        Row: {
          id: string;
          section_type: string;
          variant_key: string;
          status: 'unreviewed' | 'approved' | 'rejected';
          notes: string | null;
          reviewed_at: string | null;
          reviewed_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_type: string;
          variant_key: string;
          status?: 'unreviewed' | 'approved' | 'rejected';
          notes?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_type?: string;
          variant_key?: string;
          status?: 'unreviewed' | 'approved' | 'rejected';
          notes?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      template_customizations: {
        Row: {
          id: string;
          template_id: string;
          sections: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          template_id: string;
          sections: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          template_id?: string;
          sections?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
