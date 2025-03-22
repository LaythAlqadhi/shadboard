"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

export function ChatSidebarSearchInput() {
  return (
    <div className="relative grow">
      <Search className="absolute start-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="w-full bg-accent shadow-none ps-8 pe-4"
        placeholder="Search..."
        type="search"
        aria-label="Search chats or groups"
      />
    </div>
  )
}
