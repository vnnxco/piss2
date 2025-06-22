import { useState, useEffect, createContext, useContext } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...')
        
        // Get initial session with shorter timeout
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Supabase connection timeout - check your environment variables')), 15000)
        )
        
        let session = null
        let error = null
        
        try {
          const result = await Promise.race([
            sessionPromise,
            timeoutPromise
          ]) as any
          session = result.data?.session
          error = result.error
        } catch (timeoutError) {
          console.error('Supabase connection failed:', timeoutError)
          // Continue without session - app should still work in offline mode
          if (mounted) {
            setLoading(false)
          }
          return
        }
        
        if (error) {
          console.error('Error getting session:', error)
        }

        if (mounted) {
          console.log('Setting initial session:', session?.user?.email || 'No user')
          setSession(session)
          setUser(session?.user ?? null)
          
          // Only try to fetch profile if we have a user and the profiles table exists
          if (session?.user) {
            try {
              const profileData = await fetchProfile(session.user.id)
              if (mounted) {
                setProfile(profileData)
              }
            } catch (profileError) {
              console.warn('Could not fetch profile, continuing without it:', profileError)
              // Continue without profile - this is not critical
            }
          }
          
          setLoading(false)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (mounted) {
          // Stop loading so the app can continue even without auth
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    let subscription
    
    try {
      const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return

        console.log('Auth state changed:', event, session?.user?.email || 'No user')
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          try {
            const profileData = await fetchProfile(session.user.id)
            if (mounted) {
              setProfile(profileData)
            }
          } catch (profileError) {
            console.warn('Could not fetch profile during auth change:', profileError)
            // Continue without profile
          }
        } else {
          setProfile(null)
        }
        
        if (mounted) {
          setLoading(false)
        }
      })
      
      subscription = authSubscription
    } catch (subscriptionError) {
      console.error('Failed to set up auth state listener:', subscriptionError)
      // Continue without auth state listening
    }

    return () => {
      mounted = false
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, []) // No dependencies to prevent infinite loops

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { error }
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}