"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputTime } from "@/components/ui/input-time";
import { Separator } from "./ui/separator";

export interface DateTimePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: Date;
  onValueChange?: (date?: Date) => void;
  formatStr?: string;
}

export function DateTimePicker({
  value,
  onValueChange,
  formatStr = "yyyy-MM-dd p",
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value
  );

  const handleDateSelect = (selected?: Date) => {
    if (!selected) return;

    // Preserve the time when changing the date
    const newDateTime = new Date(selected);
    if (selectedDate) {
      newDateTime.setHours(selectedDate.getHours());
      newDateTime.setMinutes(selectedDate.getMinutes());
    }

    setSelectedDate(newDateTime);
    onValueChange?.(newDateTime);
  };

  const handleTimeChange = (timeString?: string) => {
    if (!timeString) return;

    const [hours, minutes] = timeString.split(":").map(Number);

    if (selectedDate) {
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(hours);
      newDateTime.setMinutes(minutes);

      setSelectedDate(newDateTime);
      onValueChange?.(newDateTime);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full px-3 text-start font-normal"
        >
          {selectedDate ? (
            format(selectedDate, formatStr)
          ) : (
            <span className="text-muted-foreground">Pick date and time</span>
          )}
          <CalendarIcon className="ms-auto h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
        <Separator />
        <InputTime
          className="rounded-t-none border-0"
          onValueChange={handleTimeChange}
          value={selectedDate ? format(selectedDate, "p") : undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
