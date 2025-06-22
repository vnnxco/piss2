import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'

export interface Project {
  id: string
  name: string
  description: string
  plan: 'personal' | 'creator' | 'business'
  social_links: Record<string, string> | null
  user_id: string
  created_at: string
  updated_at: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { user, connectionError } = useAuth()

  const fetchProjects = async () => {
    if (!user || connectionError) {
      setProjects([])
      setLoading(false)
      return
    }

    try {
      console.log('Fetching projects for user:', user.id)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        throw error
      }
      
      console.log('Fetched projects:', data)
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: {
    name: string
    description: string
    plan: 'personal' | 'creator' | 'business'
    social_links?: Record<string, string>
  }) => {
    if (!user) {
      console.error('User not authenticated')
      return { data: null, error: new Error('User not authenticated') }
    }

    if (connectionError) {
      console.error('No connection to database')
      return { data: null, error: new Error('No connection to database service') }
    }

    try {
      console.log('Creating project with data:', projectData)
      console.log('User ID:', user.id)
      
      // Clean up social_links - remove empty values
      const cleanSocialLinks = projectData.social_links ? 
        Object.fromEntries(
          Object.entries(projectData.social_links).filter(([_, value]) => value && value.trim() !== '')
        ) : null

      const insertData = {
        name: projectData.name.trim(),
        description: projectData.description.trim(),
        plan: projectData.plan,
        social_links: Object.keys(cleanSocialLinks || {}).length > 0 ? cleanSocialLinks : null,
        user_id: user.id,
      }

      console.log('Insert data:', insertData)
      
      // Test connection first with a simple query
      try {
        const { error: testError } = await supabase
          .from('projects')
          .select('count')
          .eq('user_id', user.id)
          .limit(1)

        if (testError) {
          console.error('Connection test failed:', testError)
          return { data: null, error: testError }
        }
      } catch (testError) {
        console.error('Connection test failed:', testError)
        return { data: null, error: new Error('Database connection failed') }
      }

      console.log('Connection test passed, proceeding with insert...')

      const { data, error } = await supabase
        .from('projects')
        .insert(insertData)
        .select()
        .single()

      if (error) {
        console.error('Supabase error creating project:', error)
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        return { data: null, error }
      }
      
      console.log('Project created successfully:', data)
      
      // Update local state
      setProjects(prev => [data, ...prev])
      return { data, error: null }
    } catch (error) {
      console.error('Unexpected error creating project:', error)
      return { data: null, error }
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    if (connectionError) {
      return { data: null, error: new Error('No connection to database service') }
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Update local state
      setProjects(prev => prev.map(p => p.id === id ? data : p))
      return { data, error: null }
    } catch (error) {
      console.error('Error updating project:', error)
      return { data: null, error }
    }
  }

  const deleteProject = async (id: string) => {
    if (connectionError) {
      return { error: new Error('No connection to database service') }
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Update local state
      setProjects(prev => prev.filter(p => p.id !== id))
      return { error: null }
    } catch (error) {
      console.error('Error deleting project:', error)
      return { error }
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [user, connectionError])

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  }
}