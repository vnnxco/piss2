"use client"

import { PlusCircleIcon, type LucideIcon } from "lucide-react"
import { useState } from "react"

import { Button } from '@/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { AuthPage } from '@/components/auth/auth-page'

export function NavMain({
  items,
  onNavigate,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    onClick?: () => void
  }[]
  onNavigate?: (view: string) => void
}) {
  const { isMobile } = useSidebar()
  const [showAuth, setShowAuth] = useState(false)

  if (showAuth) {
    return <AuthPage onClose={() => setShowAuth(false)} />
  }
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-sidebar-foreground text-sidebar duration-200 ease-linear hover:bg-sidebar-foreground/90 hover:text-sidebar active:bg-sidebar-foreground/90 active:text-sidebar"
              onClick={() => onNavigate?.('quick-create')}
            >
              <PlusCircleIcon />
              <span>Quick Create</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                tooltip={item.title}
                isActive={item.isActive}
                onClick={item.onClick}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}