"use client"

import * as React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { AuthPage } from "./auth/auth-page"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, connectionError } = useAuth()
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

  // Show connection error if there's an issue with Supabase
  if (connectionError && !authDismissed && !showAuth) {
    return (
      <div className="min-h-screen bg-sidebar flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-sidebar-foreground mb-2">
            Connection Issue
          </h2>
          <p className="text-sidebar-foreground/70 mb-6 text-sm leading-relaxed">
            Unable to connect to the database service. This might be due to missing environment variables or network issues. 
            You can continue using the app in offline mode.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setAuthDismissed(true)}
              className="flex-1 px-4 py-2 bg-sidebar-foreground text-sidebar rounded-lg hover:bg-sidebar-foreground/90 transition-colors"
            >
              Continue Offline
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="flex-1 px-4 py-2 bg-sidebar-accent text-sidebar-foreground border border-sidebar-border rounded-lg hover:bg-sidebar-accent/80 transition-colors"
            >
              Try Authentication
            </button>
          </div>
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