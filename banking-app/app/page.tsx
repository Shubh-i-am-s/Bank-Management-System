import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import TopNav from "@/components/banking/top-nav"
import AccountCard from "@/components/banking/account-card"
import OverviewChart from "@/components/banking/overview-chart"
import TransactionsTable from "@/components/banking/transactions-table"
import TransferForm from "@/components/banking/transfer-form"
import QuickActions from "@/components/banking/quick-actions"

const accounts = [
  {
    id: "chk-001",
    label: "Savings",
    number: "••• ••34",
    balance: 58203.1,
    currency: "INR",
  },
  {
    id: "sav-002",
    label: "FD Account",
    number: "••• ••98",
    balance: 186409.2,
    currency: "INR",
  },
  {
    id: "cc-003",
    label: "Credit Card",
    number: "••• ••21",
    balance: -12405.5,
    currency: "INR",
  },
]

const transactions = [
  {
    id: "t1",
    date: "2025-10-01",
    description: "Grocery Market",
    category: "Groceries",
    amount: -82.35,
    status: "completed" as const,
  },
  {
    id: "t2",
    date: "2025-10-02",
    description: "Employer Payroll",
    category: "Income",
    amount: 3200,
    status: "completed" as const,
  },
  {
    id: "t3",
    date: "2025-10-03",
    description: "City Utilities",
    category: "Bills",
    amount: -145.2,
    status: "completed" as const,
  },
  {
    id: "t4",
    date: "2025-10-04",
    description: "Coffee Co.",
    category: "Dining",
    amount: -6.75,
    status: "pending" as const,
  },
  {
    id: "t5",
    date: "2025-10-05",
    description: "Pharmacy",
    category: "Health",
    amount: -24.99,
    status: "completed" as const,
  },
]

export default function Page() {
  return (
    <main className="min-h-dvh">
      <header className="border-b bg-card">
        <TopNav />
      </header>

      <section className="px-4 md:px-6 lg:px-10 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty">Welcome back, Alex</h1>
          <p className="text-muted-foreground mt-1">Here’s a quick overview of your accounts and recent activity.</p>
        </div>

        {/* Quick actions */}
        <QuickActions />

        {/* Accounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {accounts.map((a) => (
            <AccountCard key={a.id} label={a.label} number={a.number} balance={a.balance} currency={a.currency} />
          ))}
        </div>

        {/* Overview + Transfer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-balance">Monthly Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="text-muted-foreground text-sm">Loading chart…</div>}>
                <OverviewChart />
              </Suspense>
            </CardContent>
          </Card>

          <Card id="quick-transfer">
            <CardHeader>
              <CardTitle className="text-balance">Quick Transfer</CardTitle>
            </CardHeader>
            <CardContent>
              <TransferForm accounts={accounts} />
            </CardContent>
          </Card>
        </div>

        {/* Recent transactions */}
        <Card id="transactions">
          <CardHeader>
            <CardTitle className="text-balance">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsTable transactions={transactions} />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-balance">Important: India Banking Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>- IMPS: usually up to ₹5,00,000 per day. UPI: common limit up to ₹1,00,000/day (varies by bank).</p>
            <p>- NEFT/RTGS available 24x7; RTGS is generally for ₹2,00,000 and above.</p>
            <p>- Ensure KYC compliance (PAN/Aadhaar). Use valid IFSC for bank transfers.</p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className={cn("text-center text-xs text-muted-foreground mt-8")}>
          © {new Date().getFullYear()} NovaBank. All rights reserved.
        </div>
      </section>
    </main>
  )
}
