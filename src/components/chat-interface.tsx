import React, { useState } from 'react'
import { Send, Paperclip, Mic, MoreHorizontal, ThumbsUp, ThumbsDown, Copy, Repeat } from 'lucide-react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Card } from "./ui/card"

interface Message {
  id: number
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your AI assistant. I can help you with questions about your PDF documents, company information, and general tasks. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue,
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'assistant',
          content: "I understand your question. Based on the documents and company information available in the sidebar, I can help you analyze and provide insights. What specific aspect would you like me to focus on?",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
      
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b p-4 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg">Research Chatbot</h1>
            <p className="text-sm text-muted-foreground">AI Assistant</p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : ''}`}>
            {message.type === 'assistant' && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-green-500 text-white text-sm">AI</AvatarFallback>
              </Avatar>
            )}
            
            <div className={`max-w-3xl ${message.type === 'user' ? 'order-1' : ''}`}>
              <Card className={`p-4 ${message.type === 'user' ? 'bg-primary text-primary-foreground ml-12' : 'bg-muted'}`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </Card>
              
              {message.type === 'assistant' && (
                <div className="flex items-center gap-2 mt-2 ml-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Repeat className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {message.type === 'user' && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-blue-500 text-white text-sm">U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Research Chatbot..."
                className="pr-12 min-h-[2.5rem] resize-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 shrink-0">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-2">
            Research Chatbot can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  )
}