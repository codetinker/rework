import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DateTimePicker({
  date,
  onDateChange,
  placeholder = "Pick a date and time",
  className,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);
  const [timeValue, setTimeValue] = React.useState<string>(
    date ? format(date, "HH:mm") : "09:00"
  );

  React.useEffect(() => {
    setSelectedDate(date);
    if (date) {
      setTimeValue(format(date, "HH:mm"));
    }
  }, [date]);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) {
      setSelectedDate(undefined);
      onDateChange?.(undefined);
      return;
    }

    // Combine the selected date with the current time
    const [hours, minutes] = timeValue.split(":").map(Number);
    const combinedDate = new Date(newDate);
    combinedDate.setHours(hours, minutes, 0, 0);
    
    setSelectedDate(combinedDate);
    onDateChange?.(combinedDate);
  };

  const handleTimeChange = (newTime: string) => {
    setTimeValue(newTime);
    
    if (!selectedDate) return;

    const [hours, minutes] = newTime.split(":").map(Number);
    const newDate = new Date(selectedDate);
    newDate.setHours(hours, minutes, 0, 0);
    
    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "flex-1 justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      <div className="flex items-center gap-2 min-w-[120px]">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <Input
          type="time"
          value={timeValue}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}

// Simple DatePicker component (date only, no time)
export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);

  const handleDateSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  React.useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}