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
        // Quick timeout - don't wait too long for Supabase
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000) // 3 second timeout
        )
        
        let session = null
        
        try {
          const result = await Promise.race([
            sessionPromise,
            timeoutPromise
          ]) as any
          session = result.data?.session
        } catch (timeoutError) {
          console.warn('Supabase connection timeout, continuing without auth')
          // Continue without session - app should work offline
          if (mounted) {
            setLoading(false)
          }
          return
        }

        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          
          // Try to fetch profile but don't block on it
          if (session?.user) {
            fetchProfile(session.user.id).then(profileData => {
              if (mounted) {
                setProfile(profileData)
              }
            }).catch(() => {
              // Ignore profile fetch errors
            })
          }
          
          setLoading(false)
        }
      } catch (error) {
        console.warn('Auth initialization failed, continuing without auth:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    // Start initialization but also set a hard timeout
    initializeAuth()
    
    // Hard timeout - stop loading after 2 seconds no matter what
    const hardTimeout = setTimeout(() => {
      if (mounted) {
        setLoading(false)
      }
    }, 2000)

    // Listen for auth changes (but don't block on this)
    let subscription
    
    try {
      const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return

        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          fetchProfile(session.user.id).then(profileData => {
            if (mounted) {
              setProfile(profileData)
            }
          }).catch(() => {
            // Ignore profile fetch errors
          })
        } else {
          setProfile(null)
        }
        
        if (mounted) {
          setLoading(false)
        }
      })
      
      subscription = authSubscription
    } catch (subscriptionError) {
      console.warn('Failed to set up auth state listener:', subscriptionError)
      // Continue without auth state listening
    }

    return () => {
      mounted = false
      clearTimeout(hardTimeout)
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
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
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      // Always clear local state regardless of Supabase response
      setUser(null)
      setProfile(null)
      setSession(null)
      return { error }
    } catch (error) {
      // Clear local state even if Supabase call fails
      setUser(null)
      setProfile(null)
      setSession(null)
      return { error: error as AuthError }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
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