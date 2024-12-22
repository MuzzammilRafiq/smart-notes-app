const formatDateTime = (date: Date) => {
  const dateFormatOptions = {
    short: {
      date: { month: "2-digit", day: "2-digit", year: "numeric" },
      time: { hour: "2-digit", minute: "2-digit", hour12: true },
    },
    long: {
      date: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
      time: {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      },
    },
  };

  return {
    getShortFormat: () => ({
      date: date.toLocaleDateString("en-US", dateFormatOptions.short.date),
      time: date.toLocaleTimeString("en-US", dateFormatOptions.short.time),
      combined: `${date.toLocaleDateString(
        "en-US",
        dateFormatOptions.short.date
      )} ${date.toLocaleTimeString("en-US", dateFormatOptions.short.time)}`,
    }),
    getLongFormat: () => ({
      date: date.toLocaleDateString("en-US", dateFormatOptions.long.date),
      time: date.toLocaleTimeString("en-US", dateFormatOptions.long.time),
      combined: `${date.toLocaleDateString(
        "en-US",
        dateFormatOptions.long.date
      )} ${date.toLocaleTimeString("en-US", dateFormatOptions.long.time)}`,
    }),
    getISOString: () => date.toISOString(),
  };
};

// Usage examples:
const now = new Date();
const formatter = formatDateTime(now);

console.log(formatter.getShortFormat().combined); // 03/14/2024, 2:30 PM
console.log(formatter.getLongFormat().combined); // Tuesday, March 14, 2024 2:30:45 PM
console.log(formatter.getISOString()); // 2024-03-14T14:30:45.123Z
