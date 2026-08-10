"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const vehicles = [
  /* same data as yours */
  {
    id: "VEH-00001",
    model: "Ather 450X",
    type: "scooter",
    reg: "TS14AB1234",
    status: "available",
    health: 95,
    rides: 142,
    distance: 4280,
    price: "₹30/hr",
    battery: 88,
    lastMaint: "28 Apr 2026",
  },
  {
    id: "VEH-00002",
    model: "Ola S1 Pro",
    type: "scooter",
    reg: "TS09CD5678",
    status: "rented",
    health: 88,
    rides: 198,
    distance: 6120,
    price: "₹35/hr",
    battery: 64,
    lastMaint: "15 Apr 2026",
  },
  {
    id: "VEH-00003",
    model: "TVS iQube",
    type: "scooter",
    reg: "TS22EF9012",
    status: "available",
    health: 92,
    rides: 87,
    distance: 2650,
    price: "₹25/hr",
    battery: 100,
    lastMaint: "02 May 2026",
  },
  {
    id: "VEH-00004",
    model: "Revolt RV400",
    type: "bike",
    reg: "TS31GH3456",
    status: "rented",
    health: 78,
    rides: 256,
    distance: 9840,
    price: "₹40/hr",
    battery: 42,
    lastMaint: "10 Apr 2026",
  },
  {
    id: "VEH-00005",
    model: "Tork Kratos R",
    type: "bike",
    reg: "TS18IJ7890",
    status: "maintenance",
    health: 52,
    rides: 312,
    distance: 12400,
    price: "₹45/hr",
    battery: 0,
    lastMaint: "11 May 2026",
  },
  {
    id: "VEH-00006",
    model: "Ultraviolette F77",
    type: "bike",
    reg: "TS45KL2345",
    status: "available",
    health: 97,
    rides: 34,
    distance: 1890,
    price: "₹80/hr",
    battery: 96,
    lastMaint: "05 May 2026",
  },
  {
    id: "VEH-00007",
    model: "Hero Lectro C3",
    type: "cycle",
    reg: "TS72MN6789",
    status: "available",
    health: 100,
    rides: 67,
    distance: 890,
    price: "₹10/hr",
    battery: 78,
    lastMaint: "01 May 2026",
  },
  {
    id: "VEH-00008",
    model: "EMotorad T-Rex",
    type: "cycle",
    reg: "TS55OP1234",
    status: "rented",
    health: 85,
    rides: 45,
    distance: 560,
    price: "₹12/hr",
    battery: 55,
    lastMaint: "20 Apr 2026",
  },
  {
    id: "VEH-00009",
    model: "Tata Nexon EV",
    type: "car",
    reg: "TS08QR5678",
    status: "rented",
    health: 90,
    rides: 89,
    distance: 7640,
    price: "₹150/hr",
    battery: 71,
    lastMaint: "25 Apr 2026",
  },
  {
    id: "VEH-00010",
    model: "MG ZS EV",
    type: "car",
    reg: "TS33ST9012",
    status: "available",
    health: 94,
    rides: 56,
    distance: 5200,
    price: "₹180/hr",
    battery: 93,
    lastMaint: "08 May 2026",
  },
  {
    id: "VEH-00011",
    model: "Ather 450X",
    type: "scooter",
    reg: "TS61UV3456",
    status: "charging",
    health: 91,
    rides: 178,
    distance: 5340,
    price: "₹30/hr",
    battery: 22,
    lastMaint: "18 Apr 2026",
  },
  {
    id: "VEH-00012",
    model: "Ola S1 Pro",
    type: "scooter",
    reg: "TS27WX7890",
    status: "offline",
    health: 65,
    rides: 289,
    distance: 8900,
    price: "₹35/hr",
    battery: 0,
    lastMaint: "01 Apr 2026",
  },
];

const typeIcons: Record<string, string> = {
  scooter: "🛵",
  bike: "🏍️",
  cycle: "🚲",
  car: "🚗",
};

const statusColors: Record<string, string> = {
  available: "bg-emerald-500",
  rented: "bg-amber-500",
  maintenance: "bg-orange-500",
  charging: "bg-cyan-500",
  offline: "bg-slate-500",
};

const utilData = [
  { name: "Scooter", Utilization: 78, fill: "#3b82f6" },
  { name: "Bike", Utilization: 65, fill: "#8b5cf6" },
  { name: "Car", Utilization: 82, fill: "#10b981" },
  { name: "Cycle", Utilization: 45, fill: "#f59e0b" },
];

export default function FleetPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = vehicles.filter((v) => {
    if (typeFilter !== "all" && v.type !== typeFilter) return false;
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    return true;
  });

  const counts = {
    available: vehicles.filter((v) => v.status === "available").length,
    rented: vehicles.filter((v) => v.status === "rented").length,
    maintenance: vehicles.filter((v) => v.status === "maintenance").length,
    charging: vehicles.filter((v) => v.status === "charging").length,
    offline: vehicles.filter((v) => v.status === "offline").length,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Fleet Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage your EV vehicle fleet
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(counts).map(([status, count]) => (
          <Card
            key={status}
            className="cursor-pointer hover:scale-[1.02] transition"
            onClick={() =>
              setStatusFilter(statusFilter === status ? "all" : status)
            }>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{count}</div>
              <p className="text-xs text-muted-foreground capitalize">
                {status}
              </p>
              <div
                className={`h-1 mt-3 rounded-full ${statusColors[status]}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Vehicle List */}
        <div className="xl:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="scooter">🛵 Scooter</SelectItem>
                <SelectItem value="bike">🏍️ Bike</SelectItem>
                <SelectItem value="car">🚗 Car</SelectItem>
                <SelectItem value="cycle">🚲 Cycle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vehicles */}
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((v) => (
              <Card key={v.id} className="hover:scale-[1.01] transition">
                <CardHeader className="flex flex-row justify-between items-start space-y-0">
                  <div className="flex gap-3 items-center">
                    <span className="text-xl">{typeIcons[v.type]}</span>
                    <div>
                      <CardTitle className="text-base">{v.model}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {v.id} · {v.reg}
                      </p>
                    </div>
                  </div>

                  <Badge variant="secondary" className="capitalize">
                    {v.status}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 text-center text-sm">
                    <div>
                      <p className="font-bold">{v.rides}</p>
                      <p className="text-xs text-muted-foreground">Rides</p>
                    </div>
                    <div>
                      <p className="font-bold">
                        {(v.distance / 1000).toFixed(1)}k
                      </p>
                      <p className="text-xs text-muted-foreground">km</p>
                    </div>
                    <div>
                      <p className="font-bold">{v.price}</p>
                      <p className="text-xs text-muted-foreground">Rate</p>
                    </div>
                  </div>

                  {/* Health */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Health</span>
                      <span>{v.health}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded">
                      <div
                        className="h-2 bg-green-500 rounded"
                        style={{ width: `${v.health}%` }}
                      />
                    </div>
                  </div>

                  {/* Battery */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Battery</span>
                      <span>{v.battery}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded">
                      <div
                        className="h-2 bg-green-500 rounded"
                        style={{ width: `${v.health}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Last maintenance: {v.lastMaint}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Fleet Utilization</CardTitle>
              <CardDescription>Average utilization by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={utilData}
                  layout="vertical"
                  margin={{ left: -15 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="Utilization"
                    radius={5}
                    shape={(props) => (
                      <Rectangle
                        {...props}
                        fill={props.payload.fill}
                        radius={5}
                      />
                    )}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Needed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vehicles
                .filter((v) => v.health < 80)
                .map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{v.model}</p>
                      <p className="text-xs text-muted-foreground">
                        Health: {v.health}%
                      </p>
                    </div>
                    <Badge variant="destructive">Service</Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
