"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMedia } from "react-use";
import { Menu } from "lucide-react";

import { ensureLocalizedPathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import type { LocaleType } from "@/configs/i18n";
import type { EmailSidebarLabel } from "../types";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DynamicIcon } from "@/components/dynamic-icon";

export function EmailSidebar({ data }: { data: EmailSidebarLabel[] }) {
  const params = useParams();
  const isMediumOrSmaller = useMedia("(max-width: 767px)");

  const locale = params.lang as LocaleType;
  const filterParam = params.filter;

  const content = (
    <>
      <CardHeader className="p-3">
        <Button className="w-full" size="lg" asChild>
          <Link href={ensureLocalizedPathname("/apps/email/compose", locale)}>
            Compose
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <nav className="space-y-1.5">
          {data.map((item) => {
            const unreadCount =
              item.unreadCount >= 100 ? "+99" : item.unreadCount;

            return (
              <Link
                key={item.label}
                href={ensureLocalizedPathname(
                  "/apps/email/" + item.param,
                  locale
                )}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start",
                  filterParam === item.param && "bg-accent"
                )}
              >
                <DynamicIcon name={item.iconName} className="me-2 h-4 w-4" />
                {item.label}
                {!!unreadCount && (
                  <Badge className="ms-auto">{unreadCount}</Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </CardContent>
    </>
  );

  if (!isMediumOrSmaller) {
    return (
      <aside>
        <Card className="h-full w-72 border border-border">{content}</Card>
      </aside>
    );
  }

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ size: "icon" }),
          "fixed bottom-16 start-4 md:hidden"
        )}
        aria-label="Open email sidebar"
      >
        <Menu className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent side="start">{content}</SheetContent>
    </Sheet>
  );
}
