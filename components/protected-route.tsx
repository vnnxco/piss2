"use client"

import * as React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { AuthPage } from "./auth/auth-page"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [authDismissed, setAuthDismissed] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-sidebar flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-sidebar-foreground border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sidebar-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated, show the app
  if (user) {
    return <>{children}</>
  }

  // If auth was dismissed, show the app without authentication
  if (authDismissed && !showAuth) {
    return <>{children}</>
  }

  // If showAuth is true or auth hasn't been dismissed yet, show auth page
  if (showAuth || !authDismissed) {
    return (
      <AuthPage 
        onClose={() => {
          setShowAuth(false)
          setAuthDismissed(true)
        }} 
      />
    )
  }

  return <>{children}</>
}