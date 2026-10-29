import { escapeHtml } from "./escapeHtml.js";
import { comments } from "./data.js";

export function renderComments(comments) {
  const commentsList = document.querySelector(".comments");
  const html = comments
    .map((comment, index) => {
      const likeClass = comment.isLiked ? "-active-like" : "";
      return `
                <li class="comment" data-index="${index}">
                    <div class="comment-header">
                        <div>${comment.name}</div>
                        <div>${comment.date}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">${escapeHtml(comment.text)}</div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button class="like-button ${likeClass}"></button>
                        </div>
                    </div>
                </li>
            `;
    })
    .join("");

  commentsList.innerHTML = html;
}
