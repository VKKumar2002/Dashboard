"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

const riders = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: [
    "Aarav Sharma",
    "Priya Reddy",
    "Karthik Rao",
    "Ananya Gupta",
    "Vikram Singh",
    "Sneha Patel",
    "Rohit Verma",
    "Kavya Iyer",
    "Deepak Kumar",
    "Meera Nair",
    "Harsha Bhat",
    "Tanvi Joshi",
    "Manish Mehta",
    "Divya Pillai",
    "Akash Kapoor",
    "Navya Das",
    "Varun Chopra",
    "Swathi Menon",
    "Chetan Shah",
    "Bhavana Malhotra",
    "Nikhil Gupta",
    "Ishaan Verma",
    "Riya Sharma",
    "Sai Kumar",
    "Pranav Reddy",
  ][i],
  email: `user${i + 1}@email.com`,
  phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
  kyc: [
    "verified",
    "verified",
    "verified",
    "submitted",
    "pending",
    "verified",
    "rejected",
    "verified",
    "verified",
    "submitted",
    "verified",
    "pending",
    "verified",
    "verified",
    "submitted",
    "verified",
    "verified",
    "rejected",
    "verified",
    "verified",
    "pending",
    "verified",
    "verified",
    "submitted",
    "verified",
  ][i],
  wallet: Math.floor(Math.random() * 5000) + 200,
  rides: Math.floor(Math.random() * 50),
  swaps: Math.floor(Math.random() * 30),
  joined: new Date(
    Date.now() - Math.random() * 180 * 86400000,
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  lastActive: [
    "2h ago",
    "5m ago",
    "1d ago",
    "3h ago",
    "12m ago",
    "1h ago",
    "5d ago",
    "30m ago",
    "45m ago",
    "2d ago",
    "8h ago",
    "15m ago",
    "4h ago",
    "6h ago",
    "1d ago",
    "20m ago",
    "3h ago",
    "7d ago",
    "1h ago",
    "25m ago",
    "10m ago",
    "2h ago",
    "45m ago",
    "6h ago",
    "1d ago",
  ][i],
  active: Math.random() > 0.1,
}));

const kycColors: Record<string, string> = {
  verified: "bg-emerald-500/10 text-emerald-500",
  submitted: "bg-amber-500/10 text-amber-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  rejected: "bg-rose-500/10 text-rose-500",
};

export default function RidersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRider, setSelectedRider] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return riders.filter((r) => {
      if (filter !== "all" && r.kyc !== filter) return false;

      const q = search.toLowerCase();
      if (
        q &&
        !r.name.toLowerCase().includes(q) &&
        !r.email.toLowerCase().includes(q)
      )
        return false;

      return true;
    });
  }, [search, filter]);

  const selected =
    selectedRider !== null ? riders.find((r) => r.id === selectedRider) : null;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Rider Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage registered riders and KYC verification
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total Riders",
            value: riders.length,
            icon: "👥",
          },
          {
            label: "Verified KYC",
            value: riders.filter((r) => r.kyc === "verified").length,
            icon: "✅",
          },
          {
            label: "Pending Review",
            value: riders.filter((r) => r.kyc === "submitted").length,
            icon: "⏳",
          },
          {
            label: "Rejected",
            value: riders.filter((r) => r.kyc === "rejected").length,
            icon: "❌",
          },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row gap-3">
            <Input
              placeholder="Search riders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All KYC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All KYC</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rider</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Rides</TableHead>
                  <TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((r) => (
                  <TableRow
                    key={r.id}
                    onClick={() => setSelectedRider(r.id)}
                    className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{r.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {r.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={kycColors[r.kyc]}>{r.kyc}</Badge>
                    </TableCell>

                    <TableCell>₹{r.wallet.toLocaleString("en-IN")}</TableCell>
                    <TableCell>{r.rides}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {r.lastActive}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail */}
        <Card>
          <CardContent className="p-6">
            {selected ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
                    {selected.name[0]}
                  </div>

                  <h3 className="text-lg font-bold mt-2">{selected.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    {selected.email}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {selected.phone}
                  </p>

                  <Badge className={`mt-2 ${kycColors[selected.kyc]}`}>
                    {selected.kyc}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  {[
                    ["Wallet", `₹${selected.wallet.toLocaleString("en-IN")}`],
                    ["Rides", selected.rides],
                    ["Swaps", selected.swaps],
                    ["Joined", selected.joined],
                    ["Status", selected.active ? "Active" : "Inactive"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b py-2">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                {selected.kyc === "submitted" && (
                  <div className="flex gap-2">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Approve
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Select a rider to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
