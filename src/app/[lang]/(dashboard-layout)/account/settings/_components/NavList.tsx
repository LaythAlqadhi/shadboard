"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { linksData } from "../../_data/nav-list-links";

import { getLocalizedPathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import type { Locale } from "@/configs/i18n";

export function NavList() {
  const params = useParams();
  const pathname = usePathname();

  const locale = params.lang as Locale;

  return (
    <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground md:flex-col">
      {linksData.map((link) => {
        const localizedPathname = getLocalizedPathname(link.href, locale);

        return (
          <Link
            key={link.title}
            href={localizedPathname}
            className={cn(
              pathname === localizedPathname && "font-semibold text-primary"
            )}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
}
