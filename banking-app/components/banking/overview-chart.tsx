"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Apr", in: 340000, out: 210000 },
  { month: "May", in: 360000, out: 240000 },
  { month: "Jun", in: 330000, out: 200000 },
  { month: "Jul", in: 410000, out: 290000 },
  { month: "Aug", in: 390000, out: 270000 },
  { month: "Sep", in: 425000, out: 310000 },
]

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })

export default function OverviewChart() {
  return (
    <div className="h-[260px] md:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="inFlow" x1="0" y1="0" x2="0" y2="1">
              {/* Using CSS variables ensures theme compatibility */}
              <stop offset="5%" stopColor="oklch(var(--color-chart-1))" stopOpacity={0.6} />
              <stop offset="95%" stopColor="oklch(var(--color-chart-1))" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="outFlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(var(--color-chart-2))" stopOpacity={0.5} />
              <stop offset="95%" stopColor="oklch(var(--color-chart-2))" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--color-border))" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--color-muted-foreground))"
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={(v) => inr.format(Number(v))}
          />
          <Tooltip
            cursor={{ stroke: "hsl(var(--color-border))" }}
            contentStyle={{
              background: "oklch(var(--color-card))",
              border: "1px solid oklch(var(--color-border))",
              borderRadius: "8px",
              color: "oklch(var(--color-card-foreground))",
            }}
            formatter={(value: any, name: any) => [inr.format(Number(value)), name === "in" ? "Inflow" : "Outflow"]}
            labelFormatter={(label: any) => `Month: ${label}`}
          />
          <Area type="monotone" dataKey="in" stroke="oklch(var(--color-chart-1))" fill="url(#inFlow)" strokeWidth={2} />
          <Area
            type="monotone"
            dataKey="out"
            stroke="oklch(var(--color-chart-2))"
            fill="url(#outFlow)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
