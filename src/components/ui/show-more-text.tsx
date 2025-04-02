"use client"

import { useState } from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import { Button } from "./button"

export function ShowMoreText({
  className,
  text,
  maxLength = 250,
  asChild = false,
  ...props
}: React.ComponentProps<"p"> & {
  text: string
  maxLength?: number
  asChild?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const Comp = asChild ? Slot : "p"

  if (text.length > maxLength) {
    return (
      <Comp
        data-slot="show-more-text"
        className={cn("text-base", className)}
        {...props}
      >
        {isExpanded ? text : `${text.slice(0, maxLength)}...`} <br />
        <Button
          variant="link"
          size="sm"
          className={cn("text-base p-0", className)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      </Comp>
    )
  }

  return (
    <Comp
      data-slot="show-more-text"
      className={cn("text-base", className)}
      {...props}
    >
      {text}
    </Comp>
  )
}
