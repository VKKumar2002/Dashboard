"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const batteries = Array.from({ length: 40 }, (_, i) => ({
  id: `BAT-${String(i + 1).padStart(4, "0")}`,
  status: [
    "available",
    "available",
    "available",
    "in_use",
    "charging",
    "charging",
    "maintenance",
  ][i % 7] as string,
  charge: Math.floor(Math.random() * 100),
  health: Math.floor(60 + Math.random() * 40),
  cycles: Math.floor(Math.random() * 800),
  capacity: ["2.0 kWh", "2.5 kWh", "3.0 kWh"][i % 3],
  voltage: [48, 60, 72][i % 3],
  station: [
    "Hitech City Hub",
    "Gachibowli Center",
    "Banjara Hills Station",
    "Jubilee Hills Point",
    "Kukatpally Depot",
  ][i % 5],
  lastSwap: `${Math.floor(Math.random() * 48) + 1}h ago`,
  temp: Math.floor(20 + Math.random() * 25),
}));

const statusColors: Record<string, string> = {
  available: "bg-emerald-500",
  in_use: "bg-amber-500",
  charging: "bg-cyan-500",
  maintenance: "bg-rose-500",
};

export default function BatteriesPage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? batteries : batteries.filter((b) => b.status === filter);

  const statusData = [
    {
      name: "Available",
      value: batteries.filter((b) => b.status === "available").length,
      color: "#10b981",
    },
    {
      name: "In Use",
      value: batteries.filter((b) => b.status === "in_use").length,
      color: "#f59e0b",
    },
    {
      name: "Charging",
      value: batteries.filter((b) => b.status === "charging").length,
      color: "#06b6d4",
    },
    {
      name: "Maintenance",
      value: batteries.filter((b) => b.status === "maintenance").length,
      color: "#f43f5e",
    },
  ];

  const healthDist = [
    {
      range: "90-100%",
      count: batteries.filter((b) => b.health >= 90).length,
      color: "#10b981",
    },
    {
      range: "75-89%",
      count: batteries.filter((b) => b.health >= 75 && b.health < 90).length,
      color: "#3b82f6",
    },
    {
      range: "60-74%",
      count: batteries.filter((b) => b.health >= 60 && b.health < 75).length,
      color: "#f59e0b",
    },
    {
      range: "<60%",
      count: batteries.filter((b) => b.health < 60).length,
      color: "#f43f5e",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Battery Inventory</h1>
        <p className="text-muted-foreground">
          Track battery health, status, and swap history
        </p>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Battery Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-6 items-center">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}>
                  {statusData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2">
              {statusData.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: s.color }}
                  />
                  <span className="text-sm text-muted-foreground w-24">
                    {s.name}
                  </span>
                  <span className="text-sm font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bar */}
        <Card>
          <CardHeader>
            <CardTitle>Health Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={healthDist}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count">
                  {healthDist.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "available", "in_use", "charging", "maintenance"].map((s) => (
          <Button
            key={s}
            variant={filter === s ? "default" : "secondary"}
            onClick={() => setFilter(s)}>
            {s.replace("_", " ")} (
            {s === "all"
              ? batteries.length
              : batteries.filter((b) => b.status === s).length}
            )
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Charge</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Cycles</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Temp</TableHead>
                <TableHead>Last Swap</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono">{b.id}</TableCell>

                  <TableCell>
                    <Badge className={statusColors[b.status]}>
                      {b.status.replace("_", " ")}
                    </Badge>
                  </TableCell>

                  <TableCell>{b.charge}%</TableCell>
                  <TableCell>{b.health}%</TableCell>
                  <TableCell>{b.cycles}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {b.capacity}
                  </TableCell>
                  <TableCell>{b.station}</TableCell>
                  <TableCell>{b.temp}°C</TableCell>
                  <TableCell className="text-muted-foreground">
                    {b.lastSwap}
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
