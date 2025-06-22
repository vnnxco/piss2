"use client"

import * as React from "react"
import { 
  SearchIcon,
  FilterIcon,
  HeartIcon,
  EyeIcon,
  ExternalLinkIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useProjects } from '@/hooks/use-projects'

const projects = [
  {
    id: 1,
    title: "Customer Support Agent",
    author: "Patrick Tuell",
    authorAvatar: "🎧",
    isPro: true,
    likes: 3,
    views: 19,
    category: "Featured",
    preview: {
      bgColor: "bg-black",
      textColor: "text-white",
      content: "🎧"
    }
  },
  {
    id: 2,
    title: "Sales Assistant Bot", 
    author: "Ariel Jędrzejczak",
    authorAvatar: "💼",
    isPro: true,
    likes: 23,
    views: 292,
    category: "Featured",
    preview: {
      bgColor: "bg-black",
      textColor: "text-white",
      content: "💼"
    }
  },
  {
    id: 3,
    title: "Technical Support AI",
    author: "Chelsea Stewart",
    authorAvatar: "🔧",
    isPro: false,
    likes: 8,
    views: 36,
    category: "Featured", 
    preview: {
      bgColor: "bg-black",
      textColor: "text-white",
      content: "🔧"
    }
  },
  {
    id: 4,
    title: "Content Creator Agent",
    author: "Sam Allen",
    authorAvatar: "✍️",
    isPro: true,
    likes: 10,
    views: 49,
    category: "Featured",
    preview: {
      bgColor: "bg-orange-500",
      textColor: "text-white",
      content: "✍️"
    }
  },
  {
    id: 5,
    title: "Data Analytics Bot",
    author: "Maria Garcia",
    authorAvatar: "📊",
    isPro: true,
    likes: 15,
    views: 87,
    category: "Web Developer",
    preview: {
      bgColor: "bg-blue-600",
      textColor: "text-white", 
      content: "📊"
    }
  },
  {
    id: 6,
    title: "Language Learning Tutor",
    author: "David Kim",
    authorAvatar: "🌍",
    isPro: false,
    likes: 12,
    views: 64,
    category: "Content Creator",
    preview: {
      bgColor: "bg-green-500",
      textColor: "text-white",
      content: "🌍"
    }
  },
  {
    id: 7,
    title: "E-commerce Assistant",
    author: "Lisa Wong",
    authorAvatar: "🛒",
    isPro: true,
    likes: 18,
    views: 125,
    category: "Web Developer",
    preview: {
      bgColor: "bg-purple-600",
      textColor: "text-white",
      content: "🛒"
    }
  },
  {
    id: 8,
    title: "Social Media Manager",
    author: "Alex Thompson",
    authorAvatar: "📱",
    isPro: false,
    likes: 7,
    views: 43,
    category: "Content Creator",
    preview: {
      bgColor: "bg-pink-500",
      textColor: "text-white",
      content: "📱"
    }
  }
]

const filterTabs = [
  { name: "Featured", active: true },
  { name: "My Projects", active: false },
  { name: "Up & Coming", active: false },
  { name: "Web Developer", active: false },
  { name: "Content Creator", active: false },
  { name: "Graphic Designer", active: false },
  { name: "Motion Designer", active: false },
  { name: "Product designers", active: false },
  { name: "Spline designer", active: false }
]

export function Projects() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("Featured")
  const [showFilters, setShowFilters] = React.useState(false)
  const { projects, loading } = useProjects()

  // Convert user projects to display format
  const userProjects = projects.map(project => ({
    id: project.id,
    title: project.name,
    author: "You",
    authorAvatar: "🤖",
    isPro: project.plan !== 'personal',
    likes: 0,
    views: 0,
    category: "My Projects",
    preview: {
      bgColor: "bg-blue-600",
      textColor: "text-white",
      content: "🤖"
    },
    description: project.description,
    plan: project.plan,
    created_at: project.created_at
  }))

  // Combine user projects with example projects
  const allProjects = [...userProjects, ...projects]

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Featured" || 
                           selectedCategory === "My Projects" || 
                           project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
      {/* Main content area - scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Header Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Top Navigation */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="text-sidebar-foreground font-medium hover:bg-sidebar-accent"
                  >
                    Projects
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-sidebar-foreground/60 font-medium hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  >
                    People
                  </Button>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-96">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sidebar-foreground/40" />
                <Input
                  placeholder="Search across 1M+ independents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-4 mb-8 overflow-x-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80 flex-shrink-0"
              >
                <FilterIcon className="h-4 w-4" />
                Filters
              </Button>
              
              <div className="flex items-center gap-2 overflow-x-auto">
                {filterTabs.map((tab) => (
                  <Button
                    key={tab.name}
                    variant={activeTab === tab.name ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.name)}
                    className={`whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.name
                        ? "bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    {tab.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Section Headers */}
            {userProjects.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-sidebar-foreground">
                    My Projects
                  </h2>
                </div>
                <p className="text-sidebar-foreground/60 text-sm sm:text-base">
                  Your AI chatbot projects
                </p>
              </div>
            )}

            {/* User Projects Grid */}
            {userProjects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
                {userProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    {/* Project Preview */}
                    <div className={`${project.preview.bgColor} ${project.preview.textColor} aspect-[4/3] flex items-center justify-center text-4xl sm:text-5xl relative overflow-hidden`}>
                      <div className="text-6xl sm:text-7xl opacity-80">
                        {project.preview.content}
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      
                      {/* Action button */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                            {project.authorAvatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-sidebar-foreground truncate">
                              {project.title}
                            </p>
                            <p className="text-xs text-sidebar-foreground/60 truncate">
                              {project.description}
                            </p>
                            {project.isPro && (
                              <Badge variant="secondary" className="text-xs mt-1 bg-sidebar-foreground/10 text-sidebar-foreground/70">
                                {project.plan?.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60">
                        <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-sidebar-foreground">
                  {userProjects.length > 0 ? 'Discover More Projects' : 'Projects we love'}
                </h2>
                <Button
                  variant="ghost"
                  className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm"
                >
                  View more
                </Button>
              </div>
              <p className="text-sidebar-foreground/60 text-sm sm:text-base">
                Standout projects making waves around the web
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {projects.slice(0, 4).map((project) => (
                <Card
                  key={project.id}
                  className="group bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  {/* Project Preview */}
                  <div className={`${project.preview.bgColor} ${project.preview.textColor} aspect-[4/3] flex items-center justify-center text-4xl sm:text-5xl relative overflow-hidden`}>
                    <div className="text-6xl sm:text-7xl opacity-80">
                      {project.preview.content}
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {/* Action button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                          {project.authorAvatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-sidebar-foreground truncate">
                            {project.author}
                          </p>
                          {project.isPro && (
                            <Badge variant="secondary" className="text-xs mt-1 bg-sidebar-foreground/10 text-sidebar-foreground/70">
                              PRO
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60">
                      <div className="flex items-center gap-1">
                        <HeartIcon className="h-3 w-3" />
                        <span>{project.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <EyeIcon className="h-3 w-3" />
                        <span>{project.views}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Second Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-sidebar-foreground">
                  AI agent projects using ⚡ Framer
                </h2>
                <Button
                  variant="ghost"
                  className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm"
                >
                  View more
                </Button>
              </div>
              <p className="text-sidebar-foreground/60 text-sm sm:text-base">
                The best modern websites built on the leading web design tool, Framer
              </p>
            </div>

            {/* Second Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {projects.slice(4).map((project) => (
                <Card
                  key={project.id}
                  className="group bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  {/* Project Preview */}
                  <div className={`${project.preview.bgColor} ${project.preview.textColor} aspect-[4/3] flex items-center justify-center text-4xl sm:text-5xl relative overflow-hidden`}>
                    <div className="text-6xl sm:text-7xl opacity-80">
                      {project.preview.content}
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {/* Action button */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                          {project.authorAvatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-sidebar-foreground truncate">
                            {project.author}
                          </p>
                          {project.isPro && (
                            <Badge variant="secondary" className="text-xs mt-1 bg-sidebar-foreground/10 text-sidebar-foreground/70">
                              PRO
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60">
                      <div className="flex items-center gap-1">
                        <HeartIcon className="h-3 w-3" />
                        <span>{project.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <EyeIcon className="h-3 w-3" />
                        <span>{project.views}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Show message if no results */}
            {allProjects.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-sidebar-foreground/70 mb-4">No projects found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setActiveTab("Featured")
                  }}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  Clear filters
                </Button>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-sidebar-foreground border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sidebar-foreground/70">Loading projects...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}