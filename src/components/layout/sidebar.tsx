"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { navigationsData } from "@/data/navigations";

import { i18n } from "@/configs/i18n";

import { ensureLocalizedPathname } from "@/lib/i18n";
import { getDictionaryValue, titleCaseToCamelCase } from "@/lib/utils";

import type {
  LocaleType,
  NavigationRootItem,
  NavigationNestedItem,
} from "@/types";
import type { DictionaryType } from "@/lib/getDictionary";

import { useSettings } from "@/hooks/use-settings";

import {
  Sidebar as SidebarWrapper,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Logo from "/public/images/icons/shadboard.svg";

export function Sidebar({ dictionary }: { dictionary: DictionaryType }) {
  const pathname = usePathname();
  const params = useParams();
  const { openMobile, setOpenMobile, isMobile } = useSidebar();
  const { settings } = useSettings();

  const locale = params.lang as LocaleType;
  const direction = i18n.localeDirection[locale];
  const isRTL = direction === "rtl";
  const isHoizontalAndDesktop = settings.layout === "horizontal" && !isMobile;

  // If the layout is horizontal and not on mobile, don't render the sidebar. (We use a menubar for horizontal layout navigation.)
  if (isHoizontalAndDesktop) return null;

  const renderMenuItem = (item: NavigationRootItem | NavigationNestedItem) => {
    const title = getDictionaryValue(
      titleCaseToCamelCase(item.title),
      dictionary.navigation
    );
    const label =
      item.label &&
      getDictionaryValue(titleCaseToCamelCase(item.label), dictionary.label);

    // If the item has nested items, render it with a collapsible dropdown.
    if (item.items) {
      return (
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="w-full justify-between [&[data-state=open]>svg]:rotate-180">
              <span className="flex items-center">
                {"iconName" in item && (
                  <DynamicIcon name={item.iconName} className="me-2 h-4 w-4" />
                )}
                <span>{title}</span>
                {"label" in item && (
                  <Badge variant="secondary" className="me-2">
                    {label}
                  </Badge>
                )}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub>
              {item.items.map((subItem: NavigationNestedItem) => (
                <SidebarMenuItem key={subItem.title}>
                  {renderMenuItem(subItem)}
                </SidebarMenuItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    // Otherwise, render the item with a link.
    if ("href" in item) {
      const localizedPathname = ensureLocalizedPathname(item.href, locale);
      const isActive = pathname.includes(item.href);

      return (
        <SidebarMenuButton isActive={isActive} asChild>
          <Link href={localizedPathname}>
            {"iconName" in item && (
              <DynamicIcon name={item.iconName} className="h-4 w-4" />
            )}
            <span>{title}</span>
            {"label" in item && <Badge variant="secondary">{label}</Badge>}
          </Link>
        </SidebarMenuButton>
      );
    }
  };

  return (
    <SidebarWrapper side={isRTL ? "right" : "left"}>
      <SidebarHeader>
        <Link
          href={ensureLocalizedPathname("/", locale)}
          className="w-fit flex text-foreground font-black p-2 pb-0 mb-2 hover:text-primary/90"
          onClick={() => isMobile && setOpenMobile(!openMobile)}
        >
          <Logo className="size-6" aria-hidden />
          <span>Shadboard</span>
        </Link>
      </SidebarHeader>
      <ScrollArea>
        <SidebarContent className="gap-0">
          {navigationsData.map((nav) => {
            const title = getDictionaryValue(
              titleCaseToCamelCase(nav.title),
              dictionary.navigation
            );

            return (
              <SidebarGroup key={nav.title}>
                <SidebarGroupLabel>{title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {nav.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        {renderMenuItem(item)}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </SidebarContent>
      </ScrollArea>
    </SidebarWrapper>
  );
}
