import { comments, updateComments } from "./data.js";
import { renderComments } from "./render.js";
import { mapCommentsFromApi } from "./mapCommentsFromApi.js";
import { getComments } from "./getComments.js";
import { delay } from "./delay.js";

export function initHandlers() {
  const nameInput = document.getElementById("input");
  const textInput = document.querySelector(".add-form-text");
  const addButton = document.getElementById("button");
  const commentsList = document.querySelector(".comments");

  commentsList.addEventListener("click", async (event) => {
    const likeButton = event.target.closest(".like-button");
    if (likeButton) {
      const commentEl = likeButton.closest(".comment");
      const index = Number(commentEl.dataset.index);
      const comment = comments[index];

      if (comment.isLikeLoading) return;
      comment.isLikeLoading = true;
      renderComments(comments);
      await delay(2000);

      comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
      comment.isLiked = !comment.isLiked;
      comment.isLikeLoading = false;

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
      body: JSON.stringify({ name, text, forceError: true }),
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("400");
        }
        if (response.status >= 500) {
          throw new Error("500");
        }
        if (!response.ok) {
          throw new Error("network");
        }
        return response.json();
      })
      .then((data) => {
        return getComments().then((data) => {
          nameInput.value = "";
          textInput.value = "";
          const newComments = mapCommentsFromApi(data.comments);
          updateComments(newComments);
          renderComments(newComments);
        });
      })
      .catch((error) => {
        if (error.message === "400") {
          alert("Ошибка: Имя и комментарий должны быть не менее 3 символов.");
        } else if (error.message === "500") {
          alert("Сервер упал. Попробуйте позже.");
        } else {
          alert("Что-то пошло не так. Проверьте интернет.");
        }
      })
      .finally(() => {
        addButton.disabled = false;
        addButton.textContent = "Написать";
      });
  });
}
