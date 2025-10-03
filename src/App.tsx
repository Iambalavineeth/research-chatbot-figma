import React from 'react'
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { ChatSidebar } from "./components/chat-sidebar"
import { ChatInterface } from "./components/chat-interface"

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <ChatSidebar />
        <main className="flex-1 flex flex-col">
          <div className="border-b p-2 flex items-center">
            <SidebarTrigger className="mr-2" />
          </div>
          <ChatInterface />
        </main>
      </div>
    </SidebarProvider>
  )
}