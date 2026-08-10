"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";

const geofences = [
  {
    id: 1,
    name: "Hyderabad City Permitted Zone",
    type: "permitted",
    color: "#10b981",
    coords: [
      [17.52, 78.32],
      [17.52, 78.62],
      [17.28, 78.62],
      [17.28, 78.32],
    ] as [number, number][],
    active: true,
    violations: 12,
    desc: "Main operating zone within Hyderabad city limits",
  },
  {
    id: 2,
    name: "Airport Restricted Zone",
    type: "restricted",
    color: "#f43f5e",
    coords: [
      [17.26, 78.4],
      [17.26, 78.46],
      [17.22, 78.46],
      [17.22, 78.4],
    ] as [number, number][],
    active: true,
    violations: 5,
    desc: "Rajiv Gandhi International Airport restricted zone",
  },
  {
    id: 3,
    name: "Cantonment Restricted Zone",
    type: "restricted",
    color: "#f43f5e",
    coords: [
      [17.47, 78.5],
      [17.47, 78.54],
      [17.44, 78.54],
      [17.44, 78.5],
    ] as [number, number][],
    active: true,
    violations: 3,
    desc: "Military cantonment area",
  },
  {
    id: 4,
    name: "University Campus Zone",
    type: "restricted",
    color: "#f59e0b",
    coords: [
      [17.46, 78.33],
      [17.46, 78.36],
      [17.44, 78.36],
      [17.44, 78.33],
    ] as [number, number][],
    active: true,
    violations: 8,
    desc: "University campus - speed limit 15km/h",
  },
];

const violations = [
  {
    id: 1,
    vehicle: "VEH-00004",
    rider: "Vikram Singh",
    zone: "Airport Restricted Zone",
    type: "enter_restricted",
    time: "15 min ago",
    speed: 45,
    resolved: false,
  },
  {
    id: 2,
    vehicle: "VEH-00003",
    rider: "Karthik Rao",
    zone: "Cantonment Restricted Zone",
    type: "enter_restricted",
    time: "2h ago",
    speed: 38,
    resolved: true,
  },
  {
    id: 3,
    vehicle: "VEH-00008",
    rider: "Rohit Verma",
    zone: "University Campus Zone",
    type: "speed_violation",
    time: "3h ago",
    speed: 42,
    resolved: false,
  },
  {
    id: 4,
    vehicle: "VEH-00001",
    rider: "Aarav Sharma",
    zone: "Hyderabad City Permitted Zone",
    type: "exit_permitted",
    time: "5h ago",
    speed: 55,
    resolved: true,
  },
  {
    id: 5,
    vehicle: "VEH-00002",
    rider: "Priya Reddy",
    zone: "Airport Restricted Zone",
    type: "enter_restricted",
    time: "8h ago",
    speed: 30,
    resolved: true,
  },
  {
    id: 6,
    vehicle: "VEH-00006",
    rider: "Sneha Patel",
    zone: "University Campus Zone",
    type: "speed_violation",
    time: "1d ago",
    speed: 28,
    resolved: true,
  },
];

const violationColors: Record<string, string> = {
  enter_restricted: "destructive",
  exit_permitted: "secondary",
  speed_violation: "outline",
};

export default function GeofencingPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Geo-Fencing</h1>
        <p className="text-muted-foreground">
          Manage permitted and restricted zones
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Zones",
            value: geofences.length,
            icon: "🗺️",
          },
          {
            label: "Permitted Zones",
            value: geofences.filter((g) => g.type === "permitted").length,
            icon: "✅",
          },
          {
            label: "Restricted Zones",
            value: geofences.filter((g) => g.type === "restricted").length,
            icon: "🚫",
          },
          { label: "Total Violations", value: violations.length, icon: "⚠️" },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="text-2xl">{s.icon}</div>
              <div className="mt-2 text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map + Zones */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Map */}
        <Card className="lg:col-span-2 overflow-hidden p-0">
          <div className="h-[500px] w-full">
            <MapContainer
              center={[17.4, 78.45]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {geofences.map((g) => (
                <Polygon
                  key={g.id}
                  positions={g.coords}
                  pathOptions={{
                    color: g.color,
                    fillColor: g.color,
                    fillOpacity: 0.15,
                    weight: 2,
                  }}
                  eventHandlers={{
                    click: () => setSelectedZone(g.id),
                  }}>
                  <Popup>
                    <div className="text-black">
                      <p className="font-semibold">{g.name}</p>
                      <p className="text-xs">
                        {g.type} · {g.violations} violations
                      </p>
                    </div>
                  </Popup>
                </Polygon>
              ))}
            </MapContainer>
          </div>
        </Card>

        {/* Zone List */}
        <Card>
          <CardHeader>
            <CardTitle>Zones</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[460px] overflow-y-auto pr-3">
              <div className="space-y-3">
                {geofences.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setSelectedZone(g.id)}
                    className={`cursor-pointer rounded-lg border p-3 transition ${
                      selectedZone === g.id ? "border-primary" : ""
                    }`}>
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ background: g.color }}
                      />
                      <p className="flex-1 text-sm font-medium">{g.name}</p>
                      <Badge
                        variant={
                          g.type === "permitted" ? "default" : "destructive"
                        }>
                        {g.type}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">{g.desc}</p>

                    <div className="mt-2 flex justify-between text-xs">
                      <span>
                        Violations:{" "}
                        <span className="font-semibold text-amber-500">
                          {g.violations}
                        </span>
                      </span>
                      <span
                        className={
                          g.active ? "text-green-500" : "text-muted-foreground"
                        }>
                        {g.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Violations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Violations</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Violation</TableHead>
                <TableHead>Speed</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {violations.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-mono">{v.vehicle}</TableCell>
                  <TableCell>{v.rider}</TableCell>
                  <TableCell>{v.zone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{v.type.replace(/_/g, " ")}</Badge>
                  </TableCell>
                  <TableCell>{v.speed} km/h</TableCell>
                  <TableCell className="text-muted-foreground">
                    {v.time}
                  </TableCell>
                  <TableCell>
                    <Badge variant={v.resolved ? "default" : "secondary"}>
                      {v.resolved ? "Resolved" : "Pending"}
                    </Badge>
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
