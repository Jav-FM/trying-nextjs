import { useState, useContext, Fragment } from "react";
import CommentList from "../CommentList";
import NewComment from "../NewComment";
import classes from "./Comments.module.css";
import { NotificationContext } from "../../../../store/NotificationContext";

const Comments = (props) => {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  const getComments = async () => {
    setLoadingComments(true);
    const response = await fetch(`/api/comments/${eventId}`);
    const data = await response.json();
    setComments(data.data);
    setLoadingComments(false);
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
    try {
      notificationCtx.showNotification({
        title: "Sending...",
        message: "Sending comment to the database.",
        status: "pending",
      });
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });
      if (response.ok) {
        getComments();
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was sending.",
          status: "success",
        });
      } else {
        await response.json().then((data) => {
          throw new Error(data.message || "Something went wrong.");
        });
      }
    } catch (e) {
      notificationCtx.showNotification({
        title: "Error!",
        message: e.message,
        status: "error",
      });
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {loadingComments && <p>Loading...</p>}
      {showComments && (
        <Fragment>
          <NewComment onAddComment={addCommentHandler} comments={comments} />
          <CommentList comments={comments} />
        </Fragment>
      )}
    </section>
  );
};

export default Comments;
