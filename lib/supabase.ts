import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
const isConfigured = supabaseUrl && 
                    supabaseAnonKey && 
                    supabaseUrl !== 'https://placeholder.supabase.co' && 
                    supabaseAnonKey !== 'placeholder-key'

if (!isConfigured) {
  console.warn('⚠️  Supabase environment variables not configured properly')
  console.warn('📝 Please check your .env file and ensure you have:')
  console.warn('   VITE_SUPABASE_URL=your_supabase_project_url')
  console.warn('   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
  console.warn('🔗 Get these from: https://app.supabase.com/project/YOUR_PROJECT/settings/api')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web',
      },
    },
    // Add timeout and retry configuration
    db: {
      schema: 'public',
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string
          plan: 'personal' | 'creator' | 'business'
          social_links: Record<string, string> | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          plan: 'personal' | 'creator' | 'business'
          social_links?: Record<string, string> | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          plan?: 'personal' | 'creator' | 'business'
          social_links?: Record<string, string> | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Export a helper to check if Supabase is properly configured
export const isSupabaseConfigured = isConfigured