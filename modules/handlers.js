import { comments } from "./data.js";
import { renderComments } from "./render.js";

export function initHandlers() {
  const commentsList = document.querySelector(".comments");
  const nameInput = document.getElementById("input");
  const textInput = document.querySelector(".add-form-text");
  const addButton = document.getElementById("button");

  commentsList.addEventListener("click", (event) => {
    const likeButton = event.target.closest(".like-button");
    if (likeButton) {
      const commentEl = likeButton.closest(".comment");
      const index = Number(commentEl.dataset.index);
      const comment = comments[index];

      if (comment.isLiked) {
        comment.likes -= 1;
        comment.isLiked = false;
      } else {
        comment.likes += 1;
        comment.isLiked = true;
      }

      renderComments(comments, commentsList);
      return;
    }

    const commentEl = event.target.closest(".comment");
    if (!commentEl) return;

    const index = Number(commentEl.dataset.index);
    const comment = comments[index];

    nameInput.value = nameInput.value.trim();
    textInput.value = `${comment.name}\n\n > ${comment.text}\n\n`;
    textInput.focus();

    checkInputs();
  });

  function checkInputs() {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    addButton.disabled = !(name !== "" && text !== "");
  }

  nameInput.addEventListener("input", checkInputs);
  textInput.addEventListener("input", checkInputs);
  addButton.disabled = true;

  addButton.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (name === "" || text === "") {
      alert("Заполните оба поля!");
      return;
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const dateString = `${day}.${month}.${year} ${hours}:${minutes}`;

    comments.push({
      name: name,
      date: dateString,
      text: text,
      likes: 0,
      isLiked: false,
    });

    renderComments(comments, commentsList);

    nameInput.value = "";
    textInput.value = "";
    addButton.disabled = true;
  });
}
