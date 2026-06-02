export type DateRange = {
  startDate: string;
  endDate: string;
};

function toDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getTodayRange(referenceDate = new Date()): DateRange {
  const today = startOfDay(referenceDate);

  return {
    startDate: toDateString(today),
    endDate: toDateString(endOfDay(referenceDate))
  };
}

export function getCurrentWeekRange(referenceDate = new Date()): DateRange {
  const today = startOfDay(referenceDate);
  const day = today.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const startDate = new Date(today);

  startDate.setDate(today.getDate() + mondayOffset);

  return {
    startDate: toDateString(startDate),
    endDate: toDateString(today)
  };
}

export function getCurrentMonthRange(referenceDate = new Date()): DateRange {
  const today = startOfDay(referenceDate);
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);

  return {
    startDate: toDateString(startDate),
    endDate: toDateString(today)
  };
}

export function getCurrentYearRange(referenceDate = new Date()): DateRange {
  const today = startOfDay(referenceDate);
  const startDate = new Date(today.getFullYear(), 0, 1);

  return {
    startDate: toDateString(startDate),
    endDate: toDateString(today)
  };
}
