import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { enGB } from "date-fns/locale";
import { format, isValid, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import { formatIsoDate } from "./dateUtils.ts";

interface DateFieldProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  required?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const parseDisplayDate = (value: string) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!match) return null;

  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return `${year}-${month}-${day}`;
};

const DateField = ({
  name,
  value,
  onChange,
  onBlur,
  className = "",
  required = false,
  open,
  onOpenChange,
}: DateFieldProps) => {
  const [draft, setDraft] = useState({ value, text: formatIsoDate(value) });
  const text = draft.value === value ? draft.text : formatIsoDate(value);

  const handleTextChange = (nextText: string) => {
    setDraft({ value, text: nextText });
    if (!nextText) {
      onChange("");
      return;
    }
    const isoDate = parseDisplayDate(nextText);
    if (isoDate) onChange(isoDate);
  };

  const handleBlur = () => {
    const isoDate = parseDisplayDate(text);
    if (text && !isoDate) {
      onChange("");
      setDraft({ value: "", text: "" });
    } else if (isoDate) {
      onChange(isoDate);
      setDraft({ value: isoDate, text: formatIsoDate(isoDate) });
    }
    onBlur?.();
  };

  const selectedDate = value ? parseISO(value) : undefined;

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="text"
          name={name}
          value={text}
          onChange={(event) => handleTextChange(event.target.value)}
          onBlur={handleBlur}
          placeholder="DD/MM/YYYY"
          inputMode="numeric"
          autoComplete="off"
          required={required}
          aria-label={`${name} date, day/month/year`}
          className={`mt-2 min-w-0 w-full rounded-l-lg border p-3 ${className}`}
        />
        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          aria-label="Open calendar"
          aria-expanded={open}
          className="mt-2 rounded-r-lg border border-l-0 px-3 text-gray-600 hover:bg-gray-50"
        >
          <CalendarDays size={18} />
        </button>
      </div>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border bg-white p-2 shadow-lg">
          <DayPicker
            mode="single"
            locale={enGB}
            selected={
              selectedDate && isValid(selectedDate) ? selectedDate : undefined
            }
            onSelect={(date) => {
              if (date) {
                const isoDate = format(date, "yyyy-MM-dd");
                onChange(isoDate);
                setDraft({ value: isoDate, text: format(date, "dd/MM/yyyy") });
              }
              onOpenChange(false);
            }}
            className="rounded-lg bg-white p-2"
            classNames={{
              months: "relative flex flex-col gap-4",
              month: "space-y-3",
              month_caption: "flex h-8 items-center justify-center px-9",
              caption_label: "text-sm font-medium",
              nav: "absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-between",
              button_previous:
                "relative z-20 flex h-8 w-8 items-center justify-center rounded-md bg-white hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500",
              button_next:
                "relative z-20 flex h-8 w-8 items-center justify-center rounded-md bg-white hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500",
              weekdays: "flex",
              weekday: "w-9 text-center text-xs font-normal text-gray-500",
              week: "mt-1 flex",
              day: "h-9 w-9 p-0 text-center",
              day_button:
                "h-9 w-9 rounded-md text-sm hover:bg-gray-100 aria-selected:bg-blue-600 aria-selected:text-white",
              today:
                "rounded-md bg-blue-100 font-bold text-blue-800 ring-1 ring-inset ring-blue-300",
              outside: "text-gray-300",
              disabled: "text-gray-300 opacity-50",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateField;
