"use client"

import * as React from "react"
import { 
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ExternalLinkIcon,
  ZapIcon,
  DatabaseIcon,
  MessageSquareIcon,
  MailIcon,
  CalendarIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  CloudIcon,
  CodeIcon,
  MoreVerticalIcon,
  EditIcon,
  BookOpenIcon,
  ClockIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const integrations = [
  {
    id: 1,
    name: "Slack",
    description: "Connect your AI agents to Slack channels for seamless team communication and automated responses.",
    category: "Communication",
    status: "connected",
    icon: MessageSquareIcon,
    color: "bg-purple-500",
    isEnabled: true,
    setupTime: "2 minutes",
    popularity: "Most Popular"
  },
  {
    id: 2,
    name: "Stripe",
    description: "Process payments and handle billing through your AI agents with secure payment processing.",
    category: "Payment",
    status: "available",
    icon: CreditCardIcon,
    color: "bg-blue-500",
    isEnabled: false,
    setupTime: "5 minutes",
    popularity: "Trending"
  },
  {
    id: 3,
    name: "Google Calendar",
    description: "Schedule meetings and manage appointments automatically with intelligent calendar integration.",
    category: "Productivity",
    status: "connected",
    icon: CalendarIcon,
    color: "bg-green-500",
    isEnabled: true,
    setupTime: "3 minutes",
    popularity: "Popular"
  },
  {
    id: 4,
    name: "Shopify",
    description: "Integrate with your e-commerce store for order management and customer support automation.",
    category: "E-commerce",
    status: "available",
    icon: ShoppingCartIcon,
    color: "bg-orange-500",
    isEnabled: false,
    setupTime: "10 minutes",
    popularity: "New"
  },
  {
    id: 5,
    name: "Gmail",
    description: "Send and receive emails through your AI agents with smart email automation and responses.",
    category: "Communication",
    status: "connected",
    icon: MailIcon,
    color: "bg-red-500",
    isEnabled: true,
    setupTime: "4 minutes",
    popularity: "Popular"
  },
  {
    id: 6,
    name: "AWS S3",
    description: "Store and retrieve files from Amazon S3 buckets with seamless cloud storage integration.",
    category: "Storage",
    status: "available",
    icon: CloudIcon,
    color: "bg-yellow-500",
    isEnabled: false,
    setupTime: "8 minutes",
    popularity: "Enterprise"
  },
  {
    id: 7,
    name: "PostgreSQL",
    description: "Connect to PostgreSQL databases for advanced data operations and intelligent query processing.",
    category: "Database",
    status: "connected",
    icon: DatabaseIcon,
    color: "bg-indigo-500",
    isEnabled: false,
    setupTime: "15 minutes",
    popularity: "Developer"
  },
  {
    id: 8,
    name: "Custom API",
    description: "Build custom integrations with your own APIs using our flexible integration framework.",
    category: "Developer",
    status: "available",
    icon: CodeIcon,
    color: "bg-gray-500",
    isEnabled: false,
    setupTime: "Variable",
    popularity: "Advanced"
  }
]

const categories = [
  "All Categories",
  "Communication",
  "Payment", 
  "Productivity",
  "E-commerce",
  "Storage",
  "Database",
  "Developer"
]

export function Integrations() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All Categories")
  const [integrationStates, setIntegrationStates] = React.useState(
    integrations.reduce((acc, integration) => {
      acc[integration.id] = integration.isEnabled
      return acc
    }, {} as Record<number, boolean>)
  )

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleToggleIntegration = (id: number) => {
    setIntegrationStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getStatusBadge = (status: string) => {
    if (status === 'connected') {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
        <AlertCircleIcon className="h-3 w-3 mr-1" />
        Available
      </Badge>
    )
  }

  const getPopularityBadge = (popularity: string) => {
    const colors = {
      "Most Popular": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Trending": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Popular": "bg-green-500/10 text-green-500 border-green-500/20",
      "New": "bg-orange-500/10 text-orange-500 border-orange-500/20",
      "Enterprise": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      "Developer": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      "Advanced": "bg-red-500/10 text-red-500 border-red-500/20"
    }
    
    return (
      <Badge variant="outline" className={`text-xs ${colors[popularity as keyof typeof colors]}`}>
        {popularity}
      </Badge>
    )
  }

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-medium text-white mb-2">
                    Integrations
                  </h1>
                  <p className="text-gray-400">
                    Connect your AI agents with external services and tools to extend their capabilities
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Request Integration
                </Button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sidebar-foreground/40" />
                  <Input
                    placeholder="Search integrations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === category
                        ? "bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="bg-sidebar-accent border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sidebar-foreground/70 text-sm">Connected</p>
                    <p className="text-sidebar-foreground text-xl font-semibold">
                      {integrations.filter(i => i.status === 'connected').length}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-sidebar-accent border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <ZapIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sidebar-foreground/70 text-sm">Available</p>
                    <p className="text-sidebar-foreground text-xl font-semibold">
                      {integrations.filter(i => i.status === 'available').length}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-sidebar-accent border-sidebar-border p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <SettingsIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sidebar-foreground/70 text-sm">Active</p>
                    <p className="text-sidebar-foreground text-xl font-semibold">
                      {Object.values(integrationStates).filter(Boolean).length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Integrations List */}
            <div className="space-y-4">
              {filteredIntegrations.map((integration) => (
                <Card
                  key={integration.id}
                  className="group bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`${integration.color} p-3 rounded-lg flex-shrink-0`}>
                      <integration.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-sidebar-foreground font-semibold text-lg">
                            {integration.name}
                          </h3>
                          {getPopularityBadge(integration.popularity)}
                          {getStatusBadge(integration.status)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <SettingsIcon className="h-4 w-4 mr-2" />
                              Configure
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BookOpenIcon className="h-4 w-4 mr-2" />
                              Documentation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLinkIcon className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sidebar-foreground/70 text-sm mb-4 leading-relaxed">
                        {integration.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60">
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            <span>Setup: {integration.setupTime}</span>
                          </div>
                          <Badge variant="outline" className="text-xs bg-sidebar-foreground/10 text-sidebar-foreground/70 border-sidebar-foreground/20">
                            {integration.category}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3">
                          {integration.status === 'connected' && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleIntegration(integration.id)}
                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                  integrationStates[integration.id] ? 'bg-blue-600' : 'bg-gray-600'
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    integrationStates[integration.id] ? 'translate-x-4' : 'translate-x-0'
                                  }`}
                                />
                              </button>
                              <span className="text-sm text-sidebar-foreground/70">
                                {integrationStates[integration.id] ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                          )}
                          
                          {integration.status === 'available' ? (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Connect
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
                            >
                              <EditIcon className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <ZapIcon className="h-12 w-12 text-sidebar-foreground/40 mx-auto mb-4" />
                <p className="text-sidebar-foreground/70 mb-4">No integrations found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All Categories")
                  }}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}