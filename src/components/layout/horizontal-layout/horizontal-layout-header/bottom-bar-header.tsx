"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { ensureLocalizedPathname } from "@/lib/i18n";

import type { DictionaryType } from "@/lib/getDictionary";
import type { LocaleType } from "@/types";

import { ToggleMobileSidebar } from "../../toggle-moble-sidebar";
import { CommandMenu } from "@/components/layout/command-menu";
import { ModeDropdown } from "@/components/layout/mode-dropdown";
import { LanguageDropdown } from "@/components/layout/language-dropdown";
import { UserDropdown } from "@/components/layout/user-dropdown";
import { Notifications } from "@/components/layout/notifications";
import { FullscreenToggle } from "@/components/layout/full-screen-toggle";

import Logo from "/public/images/icons/shadboard.svg";

export function BottomBarHeader({
  dictionary,
}: {
  dictionary: DictionaryType;
}) {
  const params = useParams();
  const locale = params.lang as LocaleType;

  return (
    <div className="container flex h-14 justify-between items-center gap-4">
      <ToggleMobileSidebar />
      <Link
        href={ensureLocalizedPathname("/", locale)}
        className="hidden text-foreground font-black hover:text-primary/90 lg:flex"
      >
        <Logo className="size-6" aira-hidden="true" />
        Shadboard
      </Link>
      <div className="flex gap-2">
        <CommandMenu className="lg:hidden" />
        <Notifications />
        <FullscreenToggle />
        <ModeDropdown dictionary={dictionary} />
        <LanguageDropdown dictionary={dictionary} />
        <UserDropdown dictionary={dictionary} locale={locale} />
      </div>
    </div>
  );
}
