import { formatDate } from "./formatDate.js";
export const mapCommentsFromApi = (comments) => {
  return comments.map((comment) => {
    return {
      ...comment,
      name: comment.author.name,
      date: formatDate(comment.date),
    };
  });
};
