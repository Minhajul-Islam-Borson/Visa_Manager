import { format, isValid, parseISO } from "date-fns";

export const formatIsoDate = (value: string | null | undefined) => {
  if (!value) return "";
  const date = parseISO(value);
  return isValid(date) ? format(date, "dd/MM/yyyy") : "";
};
