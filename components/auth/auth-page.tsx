"use client"

import * as React from "react"
import { useState } from "react"
import { XIcon } from "lucide-react"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { Button } from "@/components/ui/button"

type AuthMode = "login" | "signup" | "forgot-password"

interface AuthPageProps {
  onClose?: () => void
}

export function AuthPage({ onClose }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("login")

  return (
    <div className="min-h-screen bg-sidebar flex">
      {/* Close button */}
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      )}
      
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {mode === "login" && (
            <LoginForm
              onToggleMode={() => setMode("signup")}
              onForgotPassword={() => setMode("forgot-password")}
            />
          )}
          {mode === "signup" && (
            <SignupForm onToggleMode={() => setMode("login")} />
          )}
          {mode === "forgot-password" && (
            <ForgotPasswordForm onBack={() => setMode("login")} />
          )}
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-sidebar-accent via-sidebar-border to-sidebar items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-700/20"></div>
        <div className="text-center text-sidebar-foreground max-w-md relative z-10">
          <div className="w-24 h-24 bg-sidebar-foreground/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <svg className="w-12 h-12 text-sidebar-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Welcome to the future of AI
          </h2>
          <p className="text-lg text-sidebar-foreground/80 leading-relaxed">
            Build powerful AI agents, manage your knowledge base, and integrate with your favorite tools. 
            Join thousands of teams already using our platform.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-sidebar-foreground/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}