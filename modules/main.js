import { comments, updateComments } from "./data.js";
import { renderComments } from "./render.js";
import { initHandlers } from "./handlers.js";

initHandlers();

fetch("https://wedev-api.sky.pro/api/todos", {
  method: "GET",
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    updateComments(data.todos);
    renderComments(comments, commentsList);
  });

const commentsList = document.querySelector(".comments");

renderComments(comments, commentsList);
initHandlers();

console.log("It works!");
