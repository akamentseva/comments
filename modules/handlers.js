import { comments, updateComments } from "./data.js";
import { renderComments } from "./render.js";
import { formatDate } from "./formatDate.js";
import { mapCommentsFromApi } from "./mapCommentsFromApi.js";
import { getComments } from "./getComments.js";

export function initHandlers() {
  const nameInput = document.getElementById("input");
  const textInput = document.querySelector(".add-form-text");
  const addButton = document.getElementById("button");
  const commentsList = document.querySelector(".comments");

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

      renderComments(comments);
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

    fetch("https://wedev-api.sky.pro/api/v1/akamentseva/comments", {
      method: "POST",
      body: JSON.stringify({ name, text }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return getComments().then((data) => {
          const newComments = mapCommentsFromApi(data.comments);
          updateComments(newComments);
          renderComments(newComments);
        });
      });
    nameInput.value = "";
    textInput.value = "";
  });
}
