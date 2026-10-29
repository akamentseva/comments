import { comments, updateComments } from "./data.js";
import { renderComments } from "./render.js";
import { initHandlers } from "./handlers.js";
import { getComments } from "./getComments.js";
import { mapCommentsFromApi } from "./mapCommentsFromApi.js";

getComments().then((data) => {
  const newComments = mapCommentsFromApi(data.comments);
  updateComments(newComments);
  renderComments(comments);
});

initHandlers();
