export const isDateInThisWeek = (date: Date, baseDate?: Date) => {
  const today = baseDate || new Date();
  const todayDate = today.getDate();
  const todayDay = today.getDay();
  const sunday = new Date(today.setDate(todayDate - todayDay));
  const saturday = new Date(sunday);
  saturday.setDate(saturday.getDate() + 6);
  return date >= sunday && date <= saturday;
};

export const isDateBetween = (date: Date, minDate: Date, maxDate: Date) => {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  minDate = new Date(minDate);
  minDate.setHours(0, 0, 0, 0);
  maxDate = new Date(maxDate);
  maxDate.setHours(0, 0, 0, 0);
  return date >= minDate && date <= maxDate;
};

export const lessThanXHoursToTheFuture = (
  date: Date,
  amountOfHours: number
): boolean => {
  const num = amountOfHours * 60;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const anHourAgo = new Date();
  anHourAgo.setHours(
    new Date().getHours() + rhours,
    new Date().getMinutes() + rminutes
  );
  return date.getTime() < anHourAgo.getTime();
};
