"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function QuickActions() {
  const { toast } = useToast()
  const billRef = useRef<HTMLInputElement>(null)

  function goToTransfer() {
    const el = document.getElementById("quick-transfer")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
    const input = document.getElementById("amount") as HTMLInputElement | null
    // slight delay to allow scroll
    setTimeout(() => input?.focus(), 350)
  }

  function handleAddAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast({
      title: "Account request submitted",
      description: "A representative will contact you for KYC verification.",
    })
  }

  function handlePayBill(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast({
      title: "Bill payment scheduled",
      description: "Payment will be processed via NEFT/UPI as applicable.",
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6" aria-label="Quick actions">
      <Button className="rounded-lg" size="sm" onClick={goToTransfer}>
        New Transfer
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-lg" variant="secondary" size="sm">
            Pay Bill
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>Pay a bill (India)</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handlePayBill}>
            <div className="space-y-2">
              <Label>Bill type</Label>
              <Input placeholder="e.g., Electricity, Water, Broadband" required />
            </div>
            <div className="space-y-2">
              <Label>Consumer number</Label>
              <Input placeholder="Enter consumer/account number" required />
            </div>
            <div className="space-y-2">
              <Label>Amount (INR)</Label>
              <Input placeholder="₹0.00" type="number" min="0" step="0.01" required ref={billRef} />
            </div>
            <Button type="submit" className="w-full rounded-lg">
              Schedule Payment
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-lg bg-transparent" variant="outline" size="sm">
            Add Account
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>Add new account</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAddAccount}>
            <div className="space-y-2">
              <Label>Account type</Label>
              <Input placeholder="Savings / Current / FD" required />
            </div>
            <div className="space-y-2">
              <Label>PAN</Label>
              <Input placeholder="ABCDE1234F" pattern="[A-Z]{5}[0-9]{4}[A-Z]" required />
            </div>
            <div className="space-y-2">
              <Label>Aadhaar (last 4 digits)</Label>
              <Input placeholder="1234" inputMode="numeric" pattern="[0-9]{4}" required />
            </div>
            <p className="text-xs text-muted-foreground">
              KYC is mandatory as per RBI. Provide valid ID and address proof at your nearest branch.
            </p>
            <Button type="submit" className="w-full rounded-lg">
              Submit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
