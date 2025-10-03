import React, { useState, useMemo } from 'react'
import { FileText, Building2, Plus, Settings, MessageSquare, Search, ChevronRight } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "./ui/sidebar"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"

// Mock data for PDFs
const pdfFiles = [
  { id: 1, name: "Annual_Report_2024.pdf", size: "2.3 MB", lastModified: "2 days ago" },
  { id: 2, name: "Product_Specifications.pdf", size: "1.8 MB", lastModified: "1 week ago" },
  { id: 3, name: "User_Manual_v2.pdf", size: "4.1 MB", lastModified: "3 days ago" },
  { id: 4, name: "Financial_Statement.pdf", size: "1.2 MB", lastModified: "5 days ago" },
  { id: 5, name: "Marketing_Strategy.pdf", size: "3.7 MB", lastModified: "1 week ago" },
  { id: 6, name: "Technical_Documentation.pdf", size: "5.2 MB", lastModified: "4 days ago" },
]

// Mock data for companies
const companies = [
  { id: 1, name: "Apple Inc.", industry: "Technology", status: "active" },
  { id: 2, name: "Microsoft Corporation", industry: "Software", status: "active" },
  { id: 3, name: "Google LLC", industry: "Technology", status: "active" },
  { id: 4, name: "Amazon.com Inc.", industry: "E-commerce", status: "active" },
  { id: 5, name: "Tesla Inc.", industry: "Automotive", status: "active" },
  { id: 6, name: "Meta Platforms", industry: "Social Media", status: "active" },
  { id: 7, name: "Netflix Inc.", industry: "Entertainment", status: "active" },
  { id: 8, name: "Spotify AB", industry: "Music Streaming", status: "active" },
]

// Mock data for conversations
const conversations = [
  "Drug interaction analysis for elderly patients",
  "Clinical trial data interpretation",
  "Pharmaceutical regulatory compliance review",
  "Healthcare cost reduction strategies",
  "Medical device safety protocols",
  "Patient data privacy regulations",
  "Biomarker research methodology",
  "Telemedicine implementation best practices"
]

export function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter conversations based on search query (partial word matching)
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) {
      return conversations
    }
    
    const query = searchQuery.toLowerCase().trim()
    return conversations.filter(conversation => 
      conversation.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <Sidebar className="w-64">
      <SidebarHeader className="p-4 border-b">
        <Button className="w-full justify-start gap-2 h-10">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-10 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto">
        {/* Recent Conversations */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 py-2">
            Recent Conversations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton className="w-full justify-start px-4 py-2 h-auto">
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      <span className="truncate text-sm">{conversation}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No conversations found
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* PDF Files Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 py-2">
            PDF Documents
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pdfFiles.map((file) => (
                <SidebarMenuItem key={file.id}>
                  <SidebarMenuButton className="w-full justify-start px-4 py-2 h-auto">
                    <FileText className="h-4 w-4 shrink-0 text-red-500" />
                    <div className="flex flex-col items-start truncate">
                      <span className="text-sm truncate w-full">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{file.size} • {file.lastModified}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Companies Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-4 py-2">
            Companies
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {companies.map((company) => (
                <SidebarMenuItem key={company.id}>
                  <SidebarMenuButton className="w-full justify-start px-4 py-2 h-auto">
                    <Building2 className="h-4 w-4 shrink-0 text-blue-500" />
                    <div className="flex flex-col items-start truncate">
                      <span className="text-sm truncate w-full">{company.name}</span>
                      <span className="text-xs text-muted-foreground">{company.industry}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start">
              <Settings className="h-4 w-4" />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}