"use client"

import * as React from "react"
import { 
  SendIcon, 
  BotIcon,
  UserIcon,
  SettingsIcon,
  SaveIcon,
  DatabaseIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import useIsMobile from '@/hooks/use-mobile'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const mockProjects = [
  { id: '1', name: 'Customer Support Bot' },
  { id: '2', name: 'Sales Assistant' },
  { id: '3', name: 'Technical Support' },
  { id: '4', name: 'Product Recommendations' },
  { id: '5', name: 'FAQ Assistant' }
]

export function Playground() {
  const isMobile = useIsMobile()
  const [isTablet, setIsTablet] = React.useState(false)
  const [selectedProject, setSelectedProject] = React.useState("4")
  const [description, setDescription] = React.useState("You are a helpful customer support assistant for an e-commerce company. You help customers with orders, returns, and product questions. Be friendly, professional, and concise in your responses.")
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
  
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your customer support assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [currentMessage, setCurrentMessage] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  // Check for tablet view (768px to 1024px)
  React.useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= 768 && width < 1024)
    }
    
    checkTablet()
    window.addEventListener('resize', checkTablet)
    return () => window.removeEventListener('resize', checkTablet)
  }, [])

  const selectedProjectName = mockProjects.find(p => p.id === selectedProject)?.name || 'My Chatbot'

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand your question. Let me help you with that. This is a simulated response for testing purposes.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSave = () => {
    // Handle save functionality
    console.log('Saving chatbot configuration...')
  }

  const handleDatabase = () => {
    // Handle database functionality
    console.log('Opening database...')
  }

  // Settings Panel Component
  const SettingsPanel = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-sidebar-foreground font-semibold text-lg">Configurations</h3>
          
          <div className="space-y-3">
            <Label htmlFor="project-select" className="text-sidebar-foreground font-medium">
              Project
            </Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sidebar-foreground font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your chatbot should do, its personality, and how it should behave..."
              className="min-h-[120px] resize-none bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-sidebar-foreground/60">
              This is the most important setting. Be specific about your chatbot's role, tone, and capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions - Side by Side */}
      <div className="p-6 border-t border-sidebar-border bg-background">
        <div className="flex gap-3">
          <Button
            onClick={handleDatabase}
            variant="outline"
            className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
          >
            <DatabaseIcon className="h-4 w-4 mr-2" />
            Database
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
          >
            <SaveIcon className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )

  // Determine if we should show settings panel (desktop only, not tablet or mobile)
  const showSettingsPanel = !isMobile && !isTablet

  return (
    <div className="flex h-full w-full max-w-full overflow-hidden bg-background">
      {/* Left Panel - Chat Interface */}
      <div className="flex-1 flex flex-col min-h-0 border-r border-sidebar-border">
        {/* Chat Header */}
        <div className="border-b border-sidebar-border p-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BotIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-sidebar-foreground font-medium text-sm">{selectedProjectName}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(isMobile || isTablet) ? (
                <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                      <SettingsIcon className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent 
                    side="right" 
                    className="w-full sm:max-w-md p-0 bg-background border-sidebar-border"
                  >
                    <SettingsPanel />
                  </SheetContent>
                </Sheet>
              ) : (
                <Button
                  onClick={handleSave}
                  variant="ghost"
                  size="sm"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BotIcon className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-sidebar-foreground text-sidebar'
                    : 'bg-sidebar-accent text-sidebar-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-sidebar-foreground rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-4 w-4 text-sidebar" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <BotIcon className="h-4 w-4 text-white" />
              </div>
              <div className="bg-sidebar-accent text-sidebar-foreground rounded-lg p-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-sidebar-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="border-t border-sidebar-border p-4 bg-background">
          <div className="flex gap-3">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Desktop Only (not tablet) */}
      {showSettingsPanel && (
        <div className="w-80 flex flex-col min-h-0">
          <SettingsPanel />
        </div>
      )}
    </div>
  )
}