import { EllipsisVertical } from "lucide-react";

import { engagementByDeviceData } from "../_data/engagement-by-device";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EngagementByDeviceTable } from "./tables/engagement-trends-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export async function EngagementByDevice() {
  return (
    <article className="md:col-span-7">
      <Card>
        <CardHeader className="flex-row justify-between items-start space-y-0">
          <div>
            <CardTitle>Engagement By Device</CardTitle>
            <CardDescription>Last month</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="More options">
              <EllipsisVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <EngagementByDeviceTable data={engagementByDeviceData} />
        </CardContent>
      </Card>
    </article>
  );
}
