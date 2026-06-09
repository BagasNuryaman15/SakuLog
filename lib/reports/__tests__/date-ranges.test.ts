import { describe, expect, it } from "vitest";
import {
  getTodayRange,
  getCurrentWeekRange,
  getCurrentMonthRange,
  getCurrentYearRange
} from "../date-ranges";

describe("getTodayRange", () => {
  it("returns same date for start and end", () => {
    const ref = new Date(2025, 5, 15); // June 15, 2025
    const range = getTodayRange(ref);
    expect(range.startDate).toBe("2025-06-15");
    expect(range.endDate).toBe("2025-06-15");
  });

  it("pads single-digit months and days", () => {
    const ref = new Date(2025, 0, 5); // Jan 5
    const range = getTodayRange(ref);
    expect(range.startDate).toBe("2025-01-05");
  });
});

describe("getCurrentWeekRange", () => {
  it("starts on Monday for a Wednesday", () => {
    const wed = new Date(2025, 5, 11); // Wed June 11, 2025
    const range = getCurrentWeekRange(wed);
    expect(range.startDate).toBe("2025-06-09"); // Monday
    expect(range.endDate).toBe("2025-06-11");
  });

  it("starts on Monday for a Monday", () => {
    const mon = new Date(2025, 5, 9); // Mon June 9, 2025
    const range = getCurrentWeekRange(mon);
    expect(range.startDate).toBe("2025-06-09");
    expect(range.endDate).toBe("2025-06-09");
  });

  it("starts on previous Monday for a Sunday", () => {
    const sun = new Date(2025, 5, 15); // Sun June 15, 2025
    const range = getCurrentWeekRange(sun);
    expect(range.startDate).toBe("2025-06-09"); // Previous Monday
    expect(range.endDate).toBe("2025-06-15");
  });
});

describe("getCurrentMonthRange", () => {
  it("starts on 1st of current month", () => {
    const ref = new Date(2025, 5, 15);
    const range = getCurrentMonthRange(ref);
    expect(range.startDate).toBe("2025-06-01");
    expect(range.endDate).toBe("2025-06-15");
  });

  it("works on first day of month", () => {
    const ref = new Date(2025, 0, 1);
    const range = getCurrentMonthRange(ref);
    expect(range.startDate).toBe("2025-01-01");
    expect(range.endDate).toBe("2025-01-01");
  });
});

describe("getCurrentYearRange", () => {
  it("starts on Jan 1 of current year", () => {
    const ref = new Date(2025, 5, 15);
    const range = getCurrentYearRange(ref);
    expect(range.startDate).toBe("2025-01-01");
    expect(range.endDate).toBe("2025-06-15");
  });

  it("works on Jan 1", () => {
    const ref = new Date(2025, 0, 1);
    const range = getCurrentYearRange(ref);
    expect(range.startDate).toBe("2025-01-01");
    expect(range.endDate).toBe("2025-01-01");
  });
});
