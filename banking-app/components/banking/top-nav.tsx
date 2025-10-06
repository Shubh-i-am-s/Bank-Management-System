"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function TopNav() {
  const [query, setQuery] = useState("")
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSearch() {
    const trimmed = query.trim()
    toast({
      title: trimmed ? `Searching for "${trimmed}"` : "Showing recent transactions",
      description: "Scroll to the transactions table below.",
    })
    const el = document.getElementById("transactions")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className={cn("mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center gap-3")}>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden>
          <span className="text-primary text-sm font-bold">B</span>
        </div>
        <span className="font-semibold" aria-label="Bank brand">
          BharatBank
        </span>
      </div>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-2">
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search transactions"
          className="w-56 rounded-lg bg-muted focus-visible:ring-2"
          aria-label="Search transactions"
        />
        <Button variant="outline" className="rounded-lg bg-transparent" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-lg bg-transparent" aria-label="Notifications">
              <span aria-hidden className="text-lg">
                {"🔔"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 rounded-lg">
            <div className="text-sm font-medium mb-2">Notifications</div>
            <div className="text-sm text-muted-foreground">You’re all caught up.</div>
          </PopoverContent>
        </Popover>
        <Avatar className="h-8 w-8" aria-label="User avatar">
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
