import { salesTrendData } from "../../../_data/sales-trend";

import { DashboardCard } from "@/components/dashboards/dashboard-card";
import { SalesTrendChart } from "./sales-trend-chart";
import { SalesTrendSummary } from "./sales-trend-summary";

export async function SalesTrend() {
  return (
    <DashboardCard title="Sales Trend" period={salesTrendData.period}>
      <div className="space-y-6">
        <SalesTrendSummary data={salesTrendData.summary} />
        <SalesTrendChart data={salesTrendData.salesTrends} />
      </div>
    </DashboardCard>
  );
}
