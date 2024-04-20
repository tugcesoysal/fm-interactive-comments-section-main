import Comment from "./Comment";

const CommentList = ({ currentUser, commentsData, setCommentsData }) => {
  return (
    <>
      {commentsData.map((comment) => (
        <>
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            commentsData={commentsData}
            setCommentsData={setCommentsData}
          />
        </>
      ))}
    </>
  );
};

export default CommentList;
