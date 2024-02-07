import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import classes from "./comments.module.css";
import NewComment from "./new-comment";
import NotificationContext from "../../store/notification-context";

function Comments(props) {

  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState(false);
  const [commmentsLoaded, setCommentsLoaded] = useState();

  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const fetchComments = async () => {
    let comments;
    try {

      comments = await fetch("/api/comments");
      const commentsData = await comments.json();
      const specificEvents = await commentsData.comments.filter(
        (c) => c.eventId === eventId
      );
      setCommentsLoaded(specificEvents);
    } catch (error) {
      throw new Error("error to fetch data.");
      setError(true);
    }
  };

  const addCommentHandler = (commentData) => {
    //add id of event
    commentData.eventId = eventId;

    notificationCtx.showNotification({
      title: "comment",
      message: "adding comment!",
      status: "pending",
    });

    fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchComments();
        notificationCtx.showNotification({
          title: "comment",
          message: "successfull added  a new comment!",
          status: "success",
        });
      })
      .catch((error) => {
        setError(true);
        notificationCtx.showNotification({
          title: "Comment",
          message: "Error while adding a new comment!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]);

  return (
    <>
      <section className={classes.comments}>

        <button onClick={toggleCommentsHandler}>
          {showComments ? "Hide" : "Show"} Comments
        </button>

        {showComments && (
          <NewComment onAddComment={addCommentHandler} error={error} />
        )}

        {showComments && !commmentsLoaded && <p>Loading...</p>}

        {showComments && commmentsLoaded && (
          <CommentList comments={commmentsLoaded} />
        )}
        
      </section>
    </>
  );
}

export default Comments;
