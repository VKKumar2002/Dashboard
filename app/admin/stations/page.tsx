"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const stations = [
  {
    id: "STN-00001",
    name: "Hitech City Hub",
    address: "Hitech City Main Road, Madhapur",
    lat: 17.4435,
    lng: 78.3772,
    slots: 25,
    available: 12,
    charging: 6,
    empty: 7,
    status: "active",
    fee: 50,
    swapsToday: 34,
    total: 4520,
    rating: 4.8,
    manager: "Rajesh Kumar",
  },
  {
    id: "STN-00002",
    name: "Gachibowli Center",
    address: "Near DLF Cyber City",
    lat: 17.4401,
    lng: 78.3489,
    slots: 20,
    available: 8,
    charging: 5,
    empty: 7,
    status: "active",
    fee: 60,
    swapsToday: 28,
    total: 3890,
    rating: 4.6,
    manager: "Priya Reddy",
  },
  {
    id: "STN-00003",
    name: "Banjara Hills Station",
    address: "Road No 12, Banjara Hills",
    lat: 17.4156,
    lng: 78.4347,
    slots: 30,
    available: 15,
    charging: 8,
    empty: 7,
    status: "active",
    fee: 50,
    swapsToday: 41,
    total: 5200,
    rating: 4.9,
    manager: "Amit Shah",
  },
  {
    id: "STN-00004",
    name: "Jubilee Hills Point",
    address: "Jubilee Hills Check Post",
    lat: 17.4318,
    lng: 78.4071,
    slots: 18,
    available: 5,
    charging: 4,
    empty: 9,
    status: "active",
    fee: 75,
    swapsToday: 19,
    total: 2100,
    rating: 4.3,
    manager: "Sneha Patel",
  },
  {
    id: "STN-00005",
    name: "Kukatpally Depot",
    address: "KPHB Colony, Kukatpally",
    lat: 17.4947,
    lng: 78.3996,
    slots: 22,
    available: 10,
    charging: 7,
    empty: 5,
    status: "active",
    fee: 40,
    swapsToday: 32,
    total: 4100,
    rating: 4.5,
    manager: "Deepak Verma",
  },
  {
    id: "STN-00006",
    name: "Ameerpet Junction",
    address: "Near Ameerpet Metro",
    lat: 17.4375,
    lng: 78.4483,
    slots: 15,
    available: 3,
    charging: 5,
    empty: 7,
    status: "active",
    fee: 50,
    swapsToday: 15,
    total: 1800,
    rating: 4.2,
    manager: "Kavya Iyer",
  },
  {
    id: "STN-00007",
    name: "Secunderabad Hub",
    address: "Paradise Circle",
    lat: 17.4399,
    lng: 78.4983,
    slots: 28,
    available: 14,
    charging: 6,
    empty: 8,
    status: "active",
    fee: 50,
    swapsToday: 38,
    total: 4800,
    rating: 4.7,
    manager: "Rohit Sharma",
  },
  {
    id: "STN-00008",
    name: "LB Nagar Station",
    address: "LB Nagar, Near Metro",
    lat: 17.3495,
    lng: 78.5513,
    slots: 16,
    available: 2,
    charging: 8,
    empty: 6,
    status: "active",
    fee: 40,
    swapsToday: 12,
    total: 1200,
    rating: 4.0,
    manager: "Meera Nair",
  },
  {
    id: "STN-00009",
    name: "Miyapur Center",
    address: "Miyapur X Roads",
    lat: 17.4969,
    lng: 78.3567,
    slots: 20,
    available: 9,
    charging: 4,
    empty: 7,
    status: "active",
    fee: 60,
    swapsToday: 25,
    total: 3400,
    rating: 4.4,
    manager: "Harsha Bhat",
  },
  {
    id: "STN-00010",
    name: "Kondapur Point",
    address: "Kondapur Main Road",
    lat: 17.4588,
    lng: 78.3655,
    slots: 18,
    available: 7,
    charging: 3,
    empty: 8,
    status: "maintenance",
    fee: 50,
    swapsToday: 0,
    total: 2900,
    rating: 4.1,
    manager: "Tanvi Joshi",
  },
];

export default function StationsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const station = selected ? stations.find((s) => s.id === selected) : null;

  const stats = [
    {
      label: "Total Stations",
      value: stations.length,
      icon: "🏪",
    },
    {
      label: "Active",
      value: stations.filter((s) => s.status === "active").length,
      icon: "✅",
    },
    {
      label: "Available",
      value: stations.reduce((a, s) => a + s.available, 0),
      icon: "🔋",
    },
    {
      label: "Charging",
      value: stations.reduce((a, s) => a + s.charging, 0),
      icon: "⚡",
    },
    {
      label: "Today's Swaps",
      value: stations.reduce((a, s) => a + s.swapsToday, 0),
      icon: "🔄",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Battery Swap Stations
        </h1>
        <p className="text-muted-foreground">
          Monitor battery pool stations across the city
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <div className="text-3xl">{item.icon}</div>
              <p className="mt-3 text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Station List */}
        <div className="space-y-4 lg:col-span-2">
          {stations.map((s) => {
            const occupied = s.available + s.charging;
            const capacityPercent = (occupied / s.slots) * 100;

            return (
              <Card
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`cursor-pointer transition-all hover:border-primary ${
                  selected === s.id ? "border-primary ring-1 ring-primary" : ""
                }`}>
                <CardContent className="p-5">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{s.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {s.address}
                      </p>
                    </div>

                    <div className="text-right">
                      <Badge
                        variant={
                          s.status === "active" ? "default" : "secondary"
                        }>
                        {s.status}
                      </Badge>

                      <p className="mt-1 text-xs text-muted-foreground">
                        ⭐ {s.rating}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatBox
                      value={s.available}
                      label="Available"
                      color="text-green-500"
                    />

                    <StatBox
                      value={s.charging}
                      label="Charging"
                      color="text-blue-500"
                    />

                    <StatBox
                      value={s.empty}
                      label="Empty"
                      color="text-slate-500"
                    />

                    <StatBox
                      value={s.swapsToday}
                      label="Today"
                      color="text-amber-500"
                    />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        Capacity: {occupied}/{s.slots}
                      </span>
                      <span>₹{s.fee}/swap</span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${capacityPercent}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Details Panel */}
        <Card className="sticky top-6 h-fit">
          <CardContent className="p-6">
            {station ? (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl text-primary-foreground">
                    🔋
                  </div>

                  <h2 className="font-bold">{station.name}</h2>

                  <p className="text-sm text-muted-foreground">
                    {station.address}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Manager: {station.manager}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-500">
                        {station.available}
                      </p>
                      <p className="text-xs text-muted-foreground">Available</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-500">
                        {station.charging}
                      </p>
                      <p className="text-xs text-muted-foreground">Charging</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-3">
                  <DetailRow label="Total Slots" value={station.slots} />
                  <DetailRow label="Swap Fee" value={`₹${station.fee}`} />
                  <DetailRow label="Today's Swaps" value={station.swapsToday} />
                  <DetailRow
                    label="Total Swaps"
                    value={station.total.toLocaleString("en-IN")}
                  />
                  <DetailRow label="Rating" value={`⭐ ${station.rating}`} />
                  <DetailRow
                    label="Coordinates"
                    value={`${station.lat.toFixed(
                      4,
                    )}, ${station.lng.toFixed(4)}`}
                  />
                </div>

                {station.available <= 3 && (
                  <Card className="border-amber-500 bg-amber-500/5">
                    <CardContent className="p-4">
                      <p className="font-medium text-amber-500">
                        ⚠ Low Battery Alert
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Only {station.available} batteries available. Consider
                        rebalancing.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <div className="mb-3 text-5xl">🏪</div>
                <p className="text-muted-foreground">
                  Select a station to view details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatBox({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border p-3 text-center">
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
