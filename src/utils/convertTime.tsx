export const convertTime = (time: number) => {
  const date = new Date(time * 1000);
  return date.toLocaleTimeString([], {
    hour: "numeric",
  });
};

export const converToWeekDay = (time: number) => {
  const date = new Date(time * 1000);
  return date.toLocaleDateString([], {
    weekday: "long",
  });
}