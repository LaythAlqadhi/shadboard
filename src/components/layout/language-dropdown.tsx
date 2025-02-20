"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Earth } from "lucide-react";

import { i18n } from "@/configs/i18n";

import { relocalizePathname } from "@/lib/i18n";

import type { LocaleType } from "@/types";
import type { DictionaryType } from "@/lib/getDictionary";

import { useSettings } from "@/hooks/use-settings";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getDictionaryValue } from "@/lib/utils";

export function LanguageDropdown({
  dictionary,
}: {
  dictionary: DictionaryType;
}) {
  const pathname = usePathname();
  const params = useParams();
  const { settings, updateSettings } = useSettings();

  const locale = params.lang as LocaleType;
  const direction = i18n.localeDirection[locale];

  const setLocale = React.useCallback(
    (localeName: LocaleType) => {
      updateSettings({ ...settings, locale: localeName });
    },
    [settings, updateSettings]
  );

  return (
    <DropdownMenu dir={direction}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Language">
          <Earth className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {dictionary.navigation.language.language}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale}>
          {i18n.locales.map((locale) => {
            const localeName = i18n.localeNames[locale];
            const localizedLocaleName = getDictionaryValue(
              localeName,
              dictionary.navigation.language
            );

            return (
              <Link
                key={locale}
                href={relocalizePathname(pathname, locale)}
                onClick={() => setLocale(locale)}
              >
                <DropdownMenuRadioItem value={locale}>
                  {localizedLocaleName}
                </DropdownMenuRadioItem>
              </Link>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
