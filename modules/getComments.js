const baseURL = "https://wedev-api.sky.pro/api/v2/akamentseva/comments";

export const getComments = () => {
  return fetch(baseURL, {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
};
