"use client"

import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { Playground } from '@/components/playground'
import { Homepage } from '@/components/homepage'
import { Projects } from '@/components/projects'
import { KnowledgeBase } from '@/components/knowledge-base'
import { QuickCreate } from '@/components/quick-create'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function Page() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'playground' | 'projects' | 'data-library' | 'quick-create'>('dashboard')

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard')
  }

  const handleNavigateToProjects = () => {
    setCurrentView('projects')
  }

  const handleNavigateToDataLibrary = () => {
    setCurrentView('data-library')
  }

  const handleNavigateToPlayground = () => {
    setCurrentView('playground')
  }

  const handleNavigateToQuickCreate = () => {
    setCurrentView('quick-create')
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        variant="inset" 
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'quick-create') {
            setCurrentView('quick-create')
          } else {
            setCurrentView(view as 'dashboard' | 'playground' | 'projects' | 'data-library')
          }
        }}
      />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <div className="sticky top-0 z-50 bg-background rounded-t-xl overflow-hidden flex-shrink-0">
          <SiteHeader currentView={currentView} />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          {currentView === 'dashboard' ? (
            <Homepage />
          ) : currentView === 'playground' ? (
            <Playground />
          ) : currentView === 'projects' ? (
            <Projects />
          ) : currentView === 'data-library' ? (
            <KnowledgeBase />
          ) : currentView === 'quick-create' ? (
            <QuickCreate 
              onClose={() => setCurrentView('dashboard')}
              onComplete={() => setCurrentView('playground')}
            />
          ) : (
            <Homepage />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}