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
  const [loading, setLoading] = useState(false) // Start with false, only load when needed
  const { user } = useAuth()

  const fetchProjects = async () => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Error fetching projects (continuing without them):', error)
        setProjects([])
      } else {
        setProjects(data || [])
      }
    } catch (error) {
      console.warn('Error fetching projects (continuing without them):', error)
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
      return { data: null, error: new Error('User not authenticated') }
    }

    try {
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

      const { data, error } = await supabase
        .from('projects')
        .insert(insertData)
        .select()
        .single()

      if (error) {
        console.error('Supabase error creating project:', error)
        return { data: null, error }
      }
      
      // Update local state
      setProjects(prev => [data, ...prev])
      return { data, error: null }
    } catch (error) {
      console.error('Unexpected error creating project:', error)
      return { data: null, error }
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
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
    // Only fetch projects when user changes and we have a user
    if (user) {
      fetchProjects()
    } else {
      setProjects([])
      setLoading(false)
    }
  }, [user])

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  }
}