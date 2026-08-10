"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ---------------- MOCK DATA (same as yours) ---------------- */

const transactions = Array.from({ length: 50 }, (_, i) => {
  const types = ["credit", "debit"] as const;
  const type = types[i % 3 === 0 ? 0 : 1];

  const categories =
    type === "credit"
      ? ["wallet_topup", "refund", "bonus"]
      : ["rental_charge", "swap_fee", "penalty", "deposit"];

  const category = categories[i % categories.length];

  const amounts: Record<string, number[]> = {
    wallet_topup: [500, 1000, 2000, 5000],
    rental_charge: [150, 250, 400, 700, 1200],
    swap_fee: [40, 50, 60, 75],
    penalty: [100, 200, 500],
    refund: [200, 350],
    bonus: [50, 100],
    deposit: [500, 1000],
  };

  const amount = amounts[category]?.[i % amounts[category].length] || 100;

  const riders = [
    "Aarav Sharma",
    "Priya Reddy",
    "Karthik Rao",
    "Ananya Gupta",
    "Vikram Singh",
  ];

  return {
    id: `TXN-${String(i + 1).padStart(5, "0")}`,
    rider: riders[i % riders.length],
    type,
    category,
    amount,
    method: type === "credit" ? "UPI" : "Wallet",
    date: new Date(Date.now() - i * 3600000).toISOString(),
  };
});

/* ---------------- CHART DATA ---------------- */

const dailyData = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - 13 + i);

  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    income: Math.floor(20000 + Math.random() * 30000),
  };
});

const categoryData = [
  { name: "Rental", value: 185000, color: "#3b82f6" },
  { name: "Swap Fee", value: 42000, color: "#10b981" },
  { name: "Penalty", value: 18000, color: "#f43f5e" },
  { name: "Top-up", value: 320000, color: "#8b5cf6" },
  { name: "Refund", value: 12000, color: "#f59e0b" },
];

/* ---------------- UI ---------------- */

export default function TransactionsPage() {
  const [catFilter, setCatFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = transactions.filter((t) => {
    if (catFilter !== "all" && t.category !== catFilter) return false;
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    return true;
  });

  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((a, t) => a + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "debit")
    .reduce((a, t) => a + t.amount, 0);

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">Financial ledger and analytics</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="text-2xl font-bold text-emerald-500">
              ₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Expense</p>
            <p className="text-2xl font-bold text-rose-500">
              ₹{totalExpense.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Net</p>
            <p className="text-2xl font-bold text-blue-500">
              ₹{(totalIncome - totalExpense).toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area dataKey="income" stroke="#10b981" fill="#10b98133" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" outerRadius={70}>
                  {categoryData.map((c, i) => (
                    <Cell key={i} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="credit">Credit</SelectItem>
            <SelectItem value="debit">Debit</SelectItem>
          </SelectContent>
        </Select>

        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="wallet_topup">Top-up</SelectItem>
            <SelectItem value="rental_charge">Rental</SelectItem>
            <SelectItem value="swap_fee">Swap Fee</SelectItem>
            <SelectItem value="penalty">Penalty</SelectItem>
            <SelectItem value="refund">Refund</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>

                  <TableCell>{t.rider}</TableCell>

                  <TableCell>
                    <Badge
                      variant={t.type === "credit" ? "default" : "destructive"}>
                      {t.type}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {t.category}
                  </TableCell>

                  <TableCell
                    className={
                      t.type === "credit" ? "text-emerald-500" : "text-rose-500"
                    }>
                    {t.type === "credit" ? "+" : "-"}₹{t.amount}
                  </TableCell>

                  <TableCell>{t.method}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {new Date(t.date).toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
