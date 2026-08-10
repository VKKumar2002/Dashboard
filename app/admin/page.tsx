import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { SectionCards } from "@/components/section-cards";
import { ChartPieLabel } from "@/components/piechart";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 h-full">
                <ChartAreaInteractive />
              </div>
              <div className="h-full">
                <ChartPieLabel />
              </div>
            </div>
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
