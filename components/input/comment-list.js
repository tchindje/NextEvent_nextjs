import classes from "./comment-list.module.css";

const CommentList = (props) => {
  const { comments, eventId } = props;

  if (!comments || comments.lenght === 0) {
    return <div>No Comments for this event.</div>;
  }

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{comment.email}</strong>
              <span>{comment.text}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
