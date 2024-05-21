export const formatToReadableDate = (dateInSec: number): string => {
  const dateObj = new Date(dateInSec * 1000);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  return `${day} ${month} ${hours}:${minutes}:${seconds}`;
};
