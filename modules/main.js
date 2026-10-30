import { comments, updateComments } from "./data.js";
import { renderComments } from "./render.js";
import { initHandlers } from "./handlers.js";
import { getComments } from "./getComments.js";
import { mapCommentsFromApi } from "./mapCommentsFromApi.js";

const commentsElement = document.querySelector(".comments");
const addForm = document.querySelector(".add-form");

commentsElement.innerHTML = "Комментарии загружаются...";
addForm.style.display = "none";

getComments().then((data) => {
  const newComments = mapCommentsFromApi(data.comments);
  updateComments(newComments);
  renderComments(newComments);
  addForm.style.display = "";
});

initHandlers();
console.log("Its work");
