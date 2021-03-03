export const isDateInThisWeek = (date: Date, baseDate?: Date) => {
  const today = baseDate || new Date();
  const todayDate = today.getDate();
  const todayDay = today.getDay();
  const sunday = new Date(today.setDate(todayDate - todayDay));
  const saturday = new Date(sunday);
  saturday.setDate(saturday.getDate() + 6);
  return date >= sunday && date <= saturday;
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
  console.log(
    num + ' minutes = ' + rhours + ' hour(s) and ' + rminutes + ' minute(s).'
  );
  const anHourAgo = new Date();
  anHourAgo.setHours(
    new Date().getHours() + rhours,
    new Date().getMinutes() + rminutes
  );
  return date.getTime() < anHourAgo.getTime();
};
