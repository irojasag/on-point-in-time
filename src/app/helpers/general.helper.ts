export const isDateInThisWeek = (date: Date, baseDate?: Date) => {
  const today = baseDate || new Date();
  const todayDate = today.getDate();
  const todayDay = today.getDay();
  const sunday = new Date(today.setDate(todayDate - todayDay));
  const saturday = new Date(sunday);
  saturday.setDate(saturday.getDate() + 6);
  return date >= sunday && date <= saturday;
};
