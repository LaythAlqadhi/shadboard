"use client";

import * as React from "react";

import { useSettings } from "@/hooks/use-settings";

import type { DictionaryType } from "@/lib/getDictionary";

import VerticalLayout from "./vertical-layout";
import HorizontalLayout from "./horizontal-layout";
import { Customizer } from "./customizer";

export function Layout({
  children,
  dictionary,
}: {
  children: React.ReactNode;
  dictionary: DictionaryType;
}) {
  const { settings } = useSettings();
  const isVertical = settings.layout === "vertical";

  return (
    <>
      <Customizer />
      {/* If the layout is vertical, render a vertical layout; otherwise, render a horizontal layout */}
      {isVertical ? (
        <VerticalLayout dictionary={dictionary}>{children}</VerticalLayout>
      ) : (
        <HorizontalLayout dictionary={dictionary}>{children}</HorizontalLayout>
      )}
    </>
  );
}
