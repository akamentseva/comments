export const formatDate = (value) => {
  const now = value ? new Date(value) : new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(2);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const dateString = `${day}.${month}.${year} ${hours}:${minutes}`;
  return dateString;
};
