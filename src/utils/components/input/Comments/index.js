import { useState } from "react";
import CommentList from "../CommentList";
import NewComment from "../NewComment";
import classes from "./Comments.module.css";

const Comments = (props) => {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const getComments = async () => {
    const response = await fetch(`/api/comments/${eventId}`);
    const data = await response.json();
    setComments(data.data);
  };

  const toggleCommentsHandler = async () => {
    if (!showComments) {
      await getComments();
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  };

  const addCommentHandler = async (commentData) => {
    const response = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (response.status === 201) {
      getComments();
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <NewComment onAddComment={addCommentHandler} comments={comments} />
      )}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
