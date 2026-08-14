import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";

const dateFormat = (date: string | Date): string => {
  return formatInTimeZone(date, "Asia/Jakarta", "dd MMM yyyy", { locale: id });
};

export default dateFormat;
