"use client"

import * as React from "react"
import { 
  SearchIcon,
  PlusIcon,
  GlobeIcon,
  FileTextIcon,
  TypeIcon,
  FilterIcon,
  BookOpenIcon,
  FolderIcon,
  TagIcon,
  ClockIcon,
  UserIcon,
  MoreVerticalIcon,
  StarIcon,
  DownloadIcon,
  ShareIcon
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

const knowledgeItems = [
  {
    id: 1,
    title: "AI Agent Development Guide",
    type: "Document",
    category: "Development",
    description: "Comprehensive guide for building and deploying AI agents with best practices and examples.",
    author: "Technical Team",
    lastModified: "2 hours ago",
    tags: ["AI", "Development", "Guide"],
    icon: FileTextIcon,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Customer Support Workflows",
    type: "Folder",
    category: "Support",
    description: "Collection of support workflows, templates, and escalation procedures.",
    author: "Support Team",
    lastModified: "1 day ago",
    tags: ["Support", "Workflows", "Templates"],
    icon: FolderIcon,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "API Integration Handbook",
    type: "Document",
    category: "Technical",
    description: "Step-by-step instructions for integrating with third-party APIs and services.",
    author: "Engineering",
    lastModified: "3 days ago",
    tags: ["API", "Integration", "Technical"],
    icon: BookOpenIcon,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Training Data Guidelines",
    type: "Document",
    category: "AI/ML",
    description: "Best practices for collecting, cleaning, and preparing training data for AI models.",
    author: "Data Science",
    lastModified: "5 days ago",
    tags: ["Training", "Data", "ML"],
    icon: FileTextIcon,
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "Security Protocols",
    type: "Folder",
    category: "Security",
    description: "Security guidelines, protocols, and compliance documentation.",
    author: "Security Team",
    lastModified: "1 week ago",
    tags: ["Security", "Compliance", "Protocols"],
    icon: FolderIcon,
    color: "bg-red-500"
  },
  {
    id: 6,
    title: "User Experience Research",
    type: "Document",
    category: "UX",
    description: "User research findings, personas, and design recommendations.",
    author: "UX Team",
    lastModified: "1 week ago",
    tags: ["UX", "Research", "Design"],
    icon: BookOpenIcon,
    color: "bg-pink-500"
  }
]

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

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
                    Knowledge Base
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>RAG Storage: 0 B / 1.0 MB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card className="bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent/80 transition-colors cursor-pointer p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-3 rounded-lg">
                      <GlobeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sidebar-foreground font-semibold">Add URL</h3>
                      <p className="text-sidebar-foreground/70 text-sm">Import from web</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent/80 transition-colors cursor-pointer p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-3 rounded-lg">
                      <FileTextIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sidebar-foreground font-semibold">Add Files</h3>
                      <p className="text-sidebar-foreground/70 text-sm">Upload documents</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent/80 transition-colors cursor-pointer p-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500 p-3 rounded-lg">
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sidebar-foreground font-semibold">Create Text</h3>
                      <p className="text-sidebar-foreground/70 text-sm">Write content</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sidebar-foreground/40" />
                  <Input
                    placeholder="Search Knowledge Base..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button
                  variant="outline"
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80 flex items-center gap-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  Type
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            {filteredItems.length === 0 ? (
              <Card className="bg-sidebar-accent border-sidebar-border p-12">
                <div className="text-center">
                  <div className="bg-sidebar p-4 rounded-lg inline-block mb-4">
                    <BookOpenIcon className="h-12 w-12 text-sidebar-foreground/40 mx-auto" />
                  </div>
                  <h3 className="text-sidebar-foreground text-lg font-semibold mb-2">No documents found</h3>
                  <p className="text-sidebar-foreground/70 mb-6">You don't have any documents yet.</p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`${item.color} p-2 rounded-lg flex-shrink-0`}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sidebar-foreground font-semibold mb-1 line-clamp-1">
                            {item.title}
                          </h3>
                          <Badge variant="outline" className="text-xs bg-sidebar-foreground/10 text-sidebar-foreground/70 border-sidebar-foreground/20">
                            {item.type}
                          </Badge>
                        </div>
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
                            <StarIcon className="h-4 w-4 mr-2" />
                            Favorite
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShareIcon className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sidebar-foreground/70 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10"
                        >
                          <TagIcon className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-sidebar-foreground/60 pt-4 border-t border-sidebar-border">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-3 w-3" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        <span>{item.lastModified}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}