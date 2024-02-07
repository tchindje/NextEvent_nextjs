import { useRef, useState } from "react";
import classes from "./new-comment.module.css";

const NewComment = (props) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isSendData, SetIsSendData] = useState(false);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const sendCommentHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    const commentData = {
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    };

    props.onAddComment(commentData);

    //resset enter fields of forms
    emailInputRef.current.value = "";
    nameInputRef.current.value = "";
    commentInputRef.current.value = "";

    SetIsSendData(true);
  };

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
      </div>
      {!isInvalid && isSendData && (
        <p>Your comment has been send successfully!</p>
      )}
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
      {props.error && (
        <p>Error Occur while sending your comments! Try again.</p>
      )}
    </form>
  );
};

export default NewComment;
