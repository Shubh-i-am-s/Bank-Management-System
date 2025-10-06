import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function formatCurrency(n: number, currency = "INR") {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n)
  }
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(n)
}

export default function AccountCard(props: {
  label: string
  number: string
  balance: number
  currency?: string
}) {
  const positive = props.balance >= 0
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{props.label}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div>
          <div className={cn("text-2xl font-semibold", positive ? "text-foreground" : "text-destructive")}>
            {formatCurrency(props.balance, props.currency)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Acct {props.number}</div>
        </div>
        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center" aria-hidden>
          <span className="text-primary text-sm font-semibold">{props.currency === "USD" ? "$" : "₹"}</span>
        </div>
      </CardContent>
    </Card>
  )
}
