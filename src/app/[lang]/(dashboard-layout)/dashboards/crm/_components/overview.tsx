import { BadgePercent, HandCoins, Users } from "lucide-react";

import { overviewData } from "../_data/overview";

import { DashboardOverviewCard } from "@/components/dashboard-card";

export function Overview() {
  return (
    <div className="grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-4">
      <DashboardOverviewCard
        data={overviewData.totalSales}
        title="Total Sales"
        period="Last month"
        icon={BadgePercent}
        formatStyle="currency"
      />
      <DashboardOverviewCard
        data={overviewData.totalProfit}
        title="Total Profit"
        period="Last month"
        icon={HandCoins}
        formatStyle="currency"
      />
      <DashboardOverviewCard
        data={overviewData.revenueGrowth}
        title="Revenue Growth"
        period="Last month"
        icon={HandCoins}
        formatStyle="currency"
      />
      <DashboardOverviewCard
        data={overviewData.newCustomers}
        title="New Customers"
        period="Last month"
        icon={Users}
      />
    </div>
  );
}
