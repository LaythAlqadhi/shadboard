import { revenueBySourceData } from "../../../_data/revenue-by-source";

import { DashboardCard, DashboardCardActionsDropdown } from "@/components/dashboards/dashboard-card";
import { RevenueBySourceChart } from "./revenue-by-source-chart";
import { RevenueBySourceSummary } from "./revenue-by-source-summary";
import { RevenueBySourceList } from "./revenue-by-source-list";

export function RevenueBySource() {
  return (
    <DashboardCard
      title="Revenue by Source"
      period={revenueBySourceData.period}
      action={<DashboardCardActionsDropdown />}
      contentClassName="space-y-3"
    >
      <RevenueBySourceSummary data={revenueBySourceData.summary} />
      <RevenueBySourceChart data={revenueBySourceData.sources} />
      <RevenueBySourceList data={revenueBySourceData.sources} />
    </DashboardCard>
  );
}
