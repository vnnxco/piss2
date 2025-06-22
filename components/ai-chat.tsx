"use client"

import * as React from "react"
import { 
  SendIcon, 
  SparklesIcon, 
  PaperclipIcon,
  BookOpenIcon,
  CodeIcon,
  GraduationCapIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const suggestedQuestions = [
  "How does AI work?",
  "Are black holes real?",
  "How many Rs are in the word \"strawberry\"?",
  "What is the meaning of life?"
]

const quickActions = [
  { icon: SparklesIcon, label: "Create", color: "text-purple-400" },
  { icon: BookOpenIcon, label: "Explore", color: "text-blue-400" },
  { icon: CodeIcon, label: "Code", color: "text-green-400" },
  { icon: GraduationCapIcon, label: "Learn", color: "text-orange-400" }
]

export function AiChat() {
  const [message, setMessage] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle message submission
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleQuestionClick = (question: string) => {
    setMessage(question)
  }

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden">
      {/* Main content area - scrollable */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto min-h-0">
        {/* Main heading */}
        <div className="text-center mb-6 sm:mb-8 w-full">
          <h1 className="text-2xl sm:text-3xl font-medium text-white mb-4 sm:mb-6 px-2">
            How can I help you, Tails?
          </h1>
          
          {/* Quick action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="ghost"
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <action.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${action.color}`} />
                <span className="hidden xs:inline">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Suggested questions */}
        <div className="w-full max-w-2xl space-y-2 sm:space-y-3 px-2">
          {suggestedQuestions.map((question, index) => (
            <Card
              key={index}
              className="bg-background border-border hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => handleQuestionClick(question)}
            >
              <div className="p-3 sm:p-4">
                <p className="text-foreground text-sm sm:text-base">{question}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat input - sticky at bottom */}
      <div className="flex-shrink-0 w-full border-t border-gray-700 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-sidebar border-sidebar-border text-white placeholder:text-gray-400 pr-16 sm:pr-20 py-3 sm:py-4 text-sm sm:text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <PaperclipIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 hover:text-white hover:bg-white/10"
                  disabled={!message.trim()}
                >
                  <SendIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}