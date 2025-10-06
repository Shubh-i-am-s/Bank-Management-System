"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type Account = { id: string; label: string; number: string }

export default function TransferForm({ accounts }: { accounts: Account[] }) {
  const [from, setFrom] = useState<string | undefined>(accounts[0]?.id)
  const [to, setTo] = useState<string | undefined>(accounts[1]?.id)
  const [amount, setAmount] = useState<string>("")
  const { toast } = useToast()
  const fmt = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!from || !to || !amount) {
      toast({ title: "Missing fields", description: "Please fill out all fields.", variant: "default" })
      return
    }
    if (from === to) {
      toast({ title: "Invalid selection", description: "Source and destination must differ.", variant: "default" })
      return
    }
    const amt = Number(amount)
    if (Number.isNaN(amt) || amt <= 0) {
      toast({ title: "Invalid amount", description: "Enter a valid INR amount greater than 0." })
      return
    }
    console.log("[v0] Transfer", { from, to, amount })
    toast({
      title: "Transfer scheduled",
      description: `Sending ${fmt(amt)} from ${from} to ${to}.`,
    })
    setAmount("")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-2">
          <Label className="text-sm">From account</Label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {accounts.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.label} ({a.number})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">To account</Label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {accounts.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.label} ({a.number})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm" htmlFor="amount">
            Amount (INR)
          </Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="rounded-lg"
          />
          <p className="text-xs text-muted-foreground">
            Note: UPI common limit up to ₹1,00,000/day; IMPS up to ₹5,00,000/day (bank-specific).
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full rounded-lg">
        Send
      </Button>
    </form>
  )
}
