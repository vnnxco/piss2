"use client"

import * as React from "react"
import { 
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  MessageSquareIcon,
  ClockIcon,
  BarChartIcon,
  ActivityIcon,
  CalendarIcon,
  FilterIcon,
  SettingsIcon,
  CheckCircleIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const analyticsData = {
  overview: [
    {
      title: "Number of calls",
      value: "0",
      icon: MessageSquareIcon,
      verified: true
    },
    {
      title: "Average duration",
      value: "0:00",
      icon: ClockIcon,
      verified: false
    },
    {
      title: "Total cost",
      value: "0",
      suffix: "credits",
      icon: ActivityIcon,
      verified: false
    },
    {
      title: "Average cost",
      value: "0",
      suffix: "credits/call",
      icon: UsersIcon,
      verified: false
    },
    {
      title: "Total LLM cost",
      value: "$0.00",
      icon: BarChartIcon,
      verified: false
    },
    {
      title: "Average LLM cost",
      value: "$0.00",
      suffix: "/min",
      icon: TrendingUpIcon,
      verified: false
    }
  ]
}

export function Analytics() {
  const [timeRange, setTimeRange] = React.useState("Last month")

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Active calls: 0</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white"
                  >
                    <SettingsIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-1">My Workspace</p>
                <h1 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                  Good morning, Test
                </h1>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Select value="All agents" onValueChange={() => {}}>
                    <SelectTrigger className="w-32 bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All agents">All agents</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-40 bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Last 24h">Last 24h</SelectItem>
                      <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                      <SelectItem value="Last month">Last month</SelectItem>
                      <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              {analyticsData.overview.map((metric, index) => (
                <Card key={index} className="bg-sidebar-accent border-sidebar-border relative">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-sidebar-foreground/70 font-medium">
                        {metric.title}
                      </span>
                      {metric.verified && (
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-xl font-bold text-sidebar-foreground mb-1">
                      {metric.value}
                      {metric.suffix && (
                        <span className="text-xs font-normal text-sidebar-foreground/60 ml-1">
                          {metric.suffix}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Chart Area */}
            <Card className="bg-sidebar-accent border-sidebar-border mb-8">
              <CardContent className="p-8">
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-sidebar-border rounded-lg">
                  <div className="text-center">
                    <div className="bg-sidebar p-4 rounded-lg inline-block mb-4">
                      <BarChartIcon className="h-12 w-12 text-sidebar-foreground/40 mx-auto" />
                    </div>
                    <h3 className="text-sidebar-foreground text-lg font-semibold mb-2">No metrics</h3>
                    <p className="text-sidebar-foreground/70 mb-6">Once you create an agent, you will be able to track metrics here.</p>
                    <Button className="bg-white text-black hover:bg-gray-100">
                      Create an agent
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Rate Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full border-2 border-sidebar-border flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sidebar-border"></div>
                </div>
                <h2 className="text-lg font-semibold text-sidebar-foreground">Overall success rate</h2>
              </div>
              
              <Card className="bg-sidebar-accent border-sidebar-border">
                <CardContent className="p-8">
                  <div className="h-48 flex items-center justify-center border-2 border-dashed border-sidebar-border rounded-lg">
                    <div className="text-center">
                      <div className="bg-sidebar p-4 rounded-lg inline-block mb-4">
                        <BarChartIcon className="h-12 w-12 text-sidebar-foreground/40 mx-auto" />
                      </div>
                      <h3 className="text-sidebar-foreground text-lg font-semibold mb-2">No metrics</h3>
                      <p className="text-sidebar-foreground/70">Success rate data will appear here once you have agent interactions.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}