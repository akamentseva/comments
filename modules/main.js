import { comments } from "./data.js";
import { renderComments } from "./render.js";
import { initHandlers } from "./handlers.js";

const commentsList = document.querySelector(".comments");

renderComments(comments, commentsList);
initHandlers();

console.log("It works!");
