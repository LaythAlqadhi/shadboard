import { customerInsightsData } from "../../../_data/customer-insights";

import { DashboardCard, DashboardCardActionsDropdown } from "@/components/dashboards/dashboard-card";
import { CustomerInsightList } from "./customer-insight-list";

export async function CustomerInsights() {
  return (
    <DashboardCard
      title="Customer Insights"
      period={customerInsightsData.period}
      action={<DashboardCardActionsDropdown />}
      className="col-span-full"
    >
      <CustomerInsightList data={customerInsightsData} />
    </DashboardCard>
  );
}
