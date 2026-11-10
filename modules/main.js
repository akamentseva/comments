import { updateComments } from "./data.js";
import { renderComments } from "./render.js";
import { initHandlers } from "./handlers.js";
import { getComments } from "./getComments.js";
import { mapCommentsFromApi } from "./mapCommentsFromApi.js";
import { isAuthorized, getUserName } from "./auth.js";
import { renderLoginPage } from "./loginPage.js";

const commentsElement = document.querySelector(".comments");
const addForm = document.querySelector(".add-form");
const nameInput = document.getElementById("input");
const container = document.querySelector(".container");

commentsElement.innerHTML = "Комментарии загружаются...";
getComments()
  .then((data) => {
    const newComments = mapCommentsFromApi(data.comments);
    updateComments(newComments);
    renderComments(newComments);
  })
  .catch((err) => {
    console.error(err);
    commentsElement.innerHTML = "Не удалось загрузить комментарии";
  });

if (isAuthorized()) {
  nameInput.value = getUserName();
  nameInput.readOnly = true;
} else {
  addForm.style.display = "none";

  const link = document.createElement("p");
  link.innerHTML = '<a href="#">Чтобы добавить комментарий, авторизуйтесь</a>';
  link.style.textAlign = "center";
  link.style.marginTop = "20px";
  container.appendChild(link);

  link.addEventListener("click", (e) => {
    e.preventDefault();
    renderLoginPage(() => {
      window.location.reload();
    });
  });
}

initHandlers();
