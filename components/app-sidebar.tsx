"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BriefcaseIcon,
  DatabaseIcon,
  HelpCircleIcon,
  HomeIcon,
  FlaskConicalIcon,
  SettingsIcon,
} from "lucide-react"

import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import { useAuth } from '@/hooks/use-auth'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentView?: 'dashboard' | 'playground' | 'projects' | 'data-library' | 'quick-create'
  onNavigate?: (view: 'dashboard' | 'playground' | 'projects' | 'data-library' | 'quick-create') => void
}

export function AppSidebar({ currentView = 'dashboard', onNavigate, ...props }: AppSidebarProps) {
  const { user, profile } = useAuth()

  const data = {
    user: user ? {
      name: profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
      email: user.email || 'user@example.com',
      avatar: profile?.avatar_url || user.user_metadata?.avatar_url || "/avatars/default.jpg",
    } : {
      name: "Guest",
      email: "guest@example.com", 
      avatar: "/avatars/default.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: HomeIcon,
        isActive: currentView === 'dashboard',
        onClick: () => onNavigate?.('dashboard'),
      },
      {
        title: "Projects",
        url: "#",
        icon: BriefcaseIcon,
        isActive: currentView === 'projects',
        onClick: () => onNavigate?.('projects'),
      },
      {
        title: "Playground",
        url: "#",
        icon: FlaskConicalIcon,
        isActive: currentView === 'playground',
        onClick: () => onNavigate?.('playground'),
      },
      {
        title: "Data Library",
        url: "#",
        icon: DatabaseIcon,
        isActive: currentView === 'data-library',
        onClick: () => onNavigate?.('data-library'),
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: SettingsIcon,
      },
      {
        title: "Help & Support",
        url: "#",
        icon: HelpCircleIcon,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onNavigate={onNavigate} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}