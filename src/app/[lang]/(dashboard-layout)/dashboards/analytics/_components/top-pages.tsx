import { topPagesData } from "../_data/top-pages";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TopPagesTable } from "./tables/top-pages-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function TopPages() {
  return (
    <article className="md:col-span-7">
      <Card>
        <CardHeader className="flex-row justify-between items-start space-y-0">
          <div>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Last month</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="More options">
              <EllipsisVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <ScrollArea
            orientation="horizontal"
            className="w-[calc(100vw-5rem)] md:w-auto"
          >
            <TopPagesTable data={topPagesData} />
          </ScrollArea>
        </CardContent>
      </Card>
    </article>
  );
}
