"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const vehicles = [
  /* same data unchanged */
  {
    id: "VEH-00001",
    model: "Ather 450X",
    type: "scooter",
    status: "rented",
    rider: "Aarav Sharma",
    phone: "9812345678",
    lat: 17.4435,
    lng: 78.3772,
    speed: 32,
    battery: 78,
    health: 95,
  },
  {
    id: "VEH-00002",
    model: "Ola S1 Pro",
    type: "scooter",
    status: "rented",
    rider: "Priya Reddy",
    phone: "9823456789",
    lat: 17.4401,
    lng: 78.3489,
    speed: 0,
    battery: 64,
    health: 88,
  },
  {
    id: "VEH-00003",
    model: "Revolt RV400",
    type: "bike",
    status: "rented",
    rider: "Karthik Rao",
    phone: "9834567890",
    lat: 17.4156,
    lng: 78.4347,
    speed: 45,
    battery: 42,
    health: 78,
  },
  {
    id: "VEH-00004",
    model: "Tata Nexon EV",
    type: "car",
    status: "rented",
    rider: "Vikram Singh",
    phone: "9845678901",
    lat: 17.4318,
    lng: 78.4071,
    speed: 58,
    battery: 71,
    health: 90,
  },
  {
    id: "VEH-00005",
    model: "TVS iQube",
    type: "scooter",
    status: "available",
    rider: null,
    phone: null,
    lat: 17.4947,
    lng: 78.3996,
    speed: 0,
    battery: 100,
    health: 92,
  },
  {
    id: "VEH-00006",
    model: "Hero Lectro C3",
    type: "cycle",
    status: "rented",
    rider: "Sneha Patel",
    phone: "9856789012",
    lat: 17.4375,
    lng: 78.4483,
    speed: 12,
    battery: 55,
    health: 100,
  },
  {
    id: "VEH-00007",
    model: "MG ZS EV",
    type: "car",
    status: "available",
    rider: null,
    phone: null,
    lat: 17.4399,
    lng: 78.4983,
    speed: 0,
    battery: 93,
    health: 94,
  },
  {
    id: "VEH-00008",
    model: "Ultraviolette F77",
    type: "bike",
    status: "rented",
    rider: "Rohit Verma",
    phone: "9867890123",
    lat: 17.4588,
    lng: 78.3655,
    speed: 67,
    battery: 56,
    health: 97,
  },
];

const typeIcons: Record<string, string> = {
  scooter: "🛵",
  bike: "🏍️",
  cycle: "🚲",
  car: "🚗",
};

const statusColors: Record<string, string> = {
  rented: "text-amber-400",
  available: "text-emerald-400",
};

export default function TrackingPage() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => setMounted(true), []);

  const filtered = vehicles.filter(
    (v) => filter === "all" || v.status === filter,
  );

  const selectedVehicle = selected
    ? vehicles.find((v) => v.id === selected)
    : null;

  useEffect(() => {
    if (!mounted) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live GPS Tracking</h1>
          <p className="text-muted-foreground">Real-time vehicle monitoring</p>
        </div>

        <Card className="px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-sm text-muted-foreground">
            {vehicles.filter((v) => v.status === "rented").length} active
          </p>
        </Card>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* MAP */}
        <Card className="lg:col-span-3 p-0 overflow-hidden">
          <div className="h-[600px] w-full">
            <MapContainer
              center={[17.43, 78.42]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {filtered.map((v) => (
                <Marker
                  key={v.id}
                  position={[v.lat, v.lng]}
                  eventHandlers={{
                    click: () => setSelected(v.id),
                  }}>
                  <Popup>
                    <div className="text-black">
                      <p className="font-bold">
                        {typeIcons[v.type]} {v.model}
                      </p>
                      <p className="text-xs">
                        {v.id} · {v.status}
                      </p>
                      {v.rider && <p className="text-xs">Rider: {v.rider}</p>}
                      <p className="text-xs">
                        Speed: {v.speed} km/h · Battery: {v.battery}%
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Card>

        {/* SIDEBAR */}
        <div className="space-y-4">
          {/* FILTERS */}
          <div className="flex gap-2 flex-wrap">
            {["all", "rented", "available"].map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? "default" : "secondary"}
                onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          {/* LIST */}
          <div className="space-y-3 max-h-[540px] overflow-auto pr-1">
            {filtered.map((v) => (
              <Card
                key={v.id}
                onClick={() => setSelected(v.id)}
                className={`cursor-pointer transition hover:scale-[1.01] ${
                  selected === v.id ? "border-blue-500 bg-blue-500/10" : ""
                }`}>
                <CardContent className="p-4 space-y-2">
                  {/* HEADER ROW */}
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{typeIcons[v.type]}</span>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {v.model}
                      </p>
                      <p className="text-xs text-muted-foreground">{v.id}</p>
                    </div>

                    <span
                      className={`text-xs font-semibold ${
                        statusColors[v.status]
                      }`}>
                      {v.status}
                    </span>
                  </div>

                  {/* RIDER */}
                  {v.rider && (
                    <p className="text-xs text-muted-foreground">
                      👤 {v.rider}
                    </p>
                  )}

                  {/* STATS */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-muted rounded p-1">
                      <p className="text-xs font-bold">{v.speed}</p>
                      <p className="text-[10px] text-muted-foreground">km/h</p>
                    </div>

                    <div className="bg-muted rounded p-1">
                      <p className="text-xs font-bold">{v.battery}%</p>
                      <p className="text-[10px] text-muted-foreground">
                        Battery
                      </p>
                    </div>

                    <div className="bg-muted rounded p-1">
                      <p className="text-xs font-bold">{v.health}%</p>
                      <p className="text-[10px] text-muted-foreground">
                        Health
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
