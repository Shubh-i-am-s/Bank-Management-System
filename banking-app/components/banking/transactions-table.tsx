import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Tx = {
  id: string
  date: string
  description: string
  category: string
  amount: number
  status: "completed" | "pending" | "failed"
}

function formatCurrency(n: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(n)
}

export default function TransactionsTable({ transactions }: { transactions: Tx[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="whitespace-nowrap">{tx.date}</TableCell>
              <TableCell className="max-w-[280px] truncate">{tx.description}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">{tx.category}</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(tx.amount)}</TableCell>
              <TableCell className="text-right">
                <Badge
                  variant={
                    tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"
                  }
                  className="rounded-full"
                  aria-label={`Status ${tx.status}`}
                >
                  {tx.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
