"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#8b5cf6",
  "#06b6d4",
];

const ttStyle = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "8px",
};

const monthlyRevenue = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((m, i) => ({
  month: m,
  rental: Math.floor(80000 + Math.random() * 120000),
  swap: Math.floor(20000 + Math.random() * 40000),
  penalty: Math.floor(5000 + Math.random() * 15000),
}));

const dailyRides = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - 29 + i);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    rides: Math.floor(20 + Math.random() * 60),
    swaps: Math.floor(10 + Math.random() * 40),
  };
});

const vehicleUtil = [
  { type: "Scooter", utilization: 78, rides: 1240, revenue: 186000 },
  { type: "Bike", utilization: 65, rides: 890, revenue: 267000 },
  { type: "Car", utilization: 82, rides: 420, revenue: 504000 },
  { type: "Cycle", utilization: 45, rides: 560, revenue: 44800 },
];

const topRiders = [
  { name: "Vikram Singh", rides: 48, spent: 24500, swaps: 32 },
  { name: "Aarav Sharma", rides: 42, spent: 18900, swaps: 28 },
  { name: "Priya Reddy", rides: 38, spent: 16200, swaps: 24 },
  { name: "Karthik Rao", rides: 35, spent: 31000, swaps: 21 },
  { name: "Sneha Patel", rides: 31, spent: 12800, swaps: 19 },
];

const stationPerf = [
  { name: "Hitech City Hub", swaps: 4520, revenue: 226000, rating: 4.8 },
  { name: "Banjara Hills Station", swaps: 5200, revenue: 260000, rating: 4.9 },
  { name: "Secunderabad Hub", swaps: 4800, revenue: 240000, rating: 4.7 },
  { name: "Kukatpally Depot", swaps: 4100, revenue: 164000, rating: 4.5 },
  { name: "Gachibowli Center", swaps: 3890, revenue: 233400, rating: 4.6 },
];

const revenueSplit = [
  { name: "Rentals", value: 580000, color: "#3b82f6" },
  { name: "Battery Swaps", value: 185000, color: "#10b981" },
  { name: "Penalties", value: 45000, color: "#f43f5e" },
  { name: "Deposits", value: 120000, color: "#8b5cf6" },
];

const batteryHealth = [
  { range: "Excellent (90-100%)", count: 42, color: "#10b981" },
  { range: "Good (75-89%)", count: 31, color: "#3b82f6" },
  { range: "Fair (60-74%)", count: 18, color: "#f59e0b" },
  { range: "Poor (<60%)", count: 9, color: "#f43f5e" },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("30");

  const totalRev = revenueSplit.reduce((a, r) => a + r.value, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive business intelligence dashboard
          </p>
        </div>

        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
            <SelectItem value="365">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {revenueSplit.map((item) => (
          <Card
            key={item.name}
            className="border-l-4"
            style={{ borderLeftColor: item.color }}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{item.name}</p>

              <h3
                className="text-3xl font-bold mt-2"
                style={{ color: item.color }}>
                ₹{(item.value / 1000).toFixed(0)}K
              </h3>

              <p className="text-xs text-muted-foreground mt-2">
                {((item.value / totalRev) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Section */}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Revenue Breakdown</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip contentStyle={ttStyle} />
                <Legend />

                <Bar dataKey="rental" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="swap" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="penalty" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Split</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={revenueSplit}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}>
                  {revenueSplit.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip contentStyle={ttStyle} />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-3">
              {revenueSplit.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>

                  <Badge variant="secondary">
                    ₹{(item.value / 1000).toFixed(0)}K
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rides + Utilization */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Rides & Swaps</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={dailyRides}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip contentStyle={ttStyle} />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="rides"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="swaps"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Utilization</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {vehicleUtil.map((vehicle, index) => (
              <div key={vehicle.type}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{vehicle.type}</span>

                  <span className="text-muted-foreground">
                    {vehicle.utilization}% • {vehicle.rides} rides • ₹
                    {(vehicle.revenue / 1000).toFixed(0)}K
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${vehicle.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Cards */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Riders */}

        <Card>
          <CardHeader>
            <CardTitle>Top Riders</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {topRiders.map((rider, index) => (
              <div
                key={rider.name}
                className="flex items-center gap-3 rounded-lg border p-3">
                <Badge>{index + 1}</Badge>

                <div className="flex-1">
                  <p className="font-medium">{rider.name}</p>

                  <p className="text-xs text-muted-foreground">
                    {rider.rides} rides • {rider.swaps} swaps
                  </p>
                </div>

                <span className="font-semibold text-emerald-500">
                  ₹{(rider.spent / 1000).toFixed(1)}K
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Station Performance */}

        <Card>
          <CardHeader>
            <CardTitle>Station Performance</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {stationPerf.map((station) => (
              <div key={station.name} className="rounded-lg border p-3">
                <div className="flex justify-between">
                  <p className="font-medium">{station.name}</p>

                  <Badge variant="outline">⭐ {station.rating}</Badge>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {station.swaps.toLocaleString("en-IN")} swaps
                </p>

                <p className="font-semibold text-emerald-500">
                  ₹{(station.revenue / 1000).toFixed(0)}K
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Battery Health */}

        <Card>
          <CardHeader>
            <CardTitle>Battery Health</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={batteryHealth}
                  dataKey="count"
                  innerRadius={40}
                  outerRadius={65}>
                  {batteryHealth.map((item) => (
                    <Cell key={item.range} fill={item.color} />
                  ))}
                </Pie>

                <Tooltip contentStyle={ttStyle} />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              {batteryHealth.map((item) => (
                <div key={item.range} className="flex justify-between text-sm">
                  <span>{item.range}</span>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
