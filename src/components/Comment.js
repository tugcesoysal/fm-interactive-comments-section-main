import React, { useState } from "react";
import Replies from "./Replies";
import { formatDistanceToNow } from "date-fns";
import DeleteModal from "./DeleteModal";

function formatRelativeTime(timestamp) {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}

const Comment = ({ comment, currentUser, commentsData, setCommentsData }) => {
  const { user, createdAt, content, score } = comment;
  const [editOpen, setEditOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const deleteComment = (id) => {
    const updatedComments = commentsData.filter((comment) => {
      if (comment.id === id) {
        return false;
      } else {
        const updatedReplies = comment.replies.filter(
          (reply) => reply.id !== id,
        );
        comment.replies = updatedReplies;
        return true;
      }
    });
    setCommentsData(updatedComments);
    setModalOpen(false);
  };

  const upvote = (commentID) => {
    const updated = commentsData.map((c) =>
      c.id === commentID ? { ...c, score: c.score + 1 } : c,
    );
    setCommentsData(updated);
  };

  const downvote = (commentID) => {
    const updated = commentsData.map((c) =>
      c.id === commentID ? { ...c, score: Math.max(0, c.score - 1) } : c,
    );
    setCommentsData(updated);
  };

  const toggleReply = () => {
    setReplyOpen((prev) => !prev);
  };

  const sendReply = () => {
    const newReply = {
      id: comment.replies.length + 1,
      content: replyContent,
      createdAt: formatRelativeTime(Date.now()),
      replyingTo: comment.user.username,
      score: 0,
      user: currentUser,
    };

    const updatedComments = commentsData.map((c) =>
      c.id === comment.id ? { ...c, replies: [...c.replies, newReply] } : c,
    );
    setCommentsData(updatedComments);
    setReplyContent("");
    setReplyOpen(false);
  };

  const update = (commentID) => {
    const updatedComments = commentsData.map((c) =>
      c.id === commentID ? { ...c, content: editedContent } : c,
    );
    setCommentsData(updatedComments);
    setEditOpen(false);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="user-avatar">
            <img src={user.image.png} alt={user.username} />
          </div>
          <p className="username">{user.username}</p>
          {comment.user.username === currentUser.username && (
            <p className="you">you</p>
          )}
          <p className="createdAt">{createdAt}</p>
        </div>
        {editOpen ? (
          <textarea
            className="edit-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
        ) : (
          <p className="content">{content}</p>
        )}
        <div className="card-footer">
          <div className="count-button-div">
            <button onClick={() => upvote(comment.id)}>
              <img src="./images/icon-plus.svg" alt="plus count button" />
            </button>
            <p className="count">{score}</p>
            <button onClick={() => downvote(comment.id)} className="minus-btn">
              <img src="./images/icon-minus.svg" alt="minus count button" />
            </button>
          </div>
          {currentUser.username === comment.user.username ? (
            <>
              <button
                onClick={() => setModalOpen(true)}
                className="delete-button"
              >
                <img src="./images/icon-delete.svg" alt="delete button" />
                <p>Delete</p>
              </button>
              <button onClick={() => setEditOpen(true)} className="edit-button">
                <img src="./images/icon-edit.svg" alt="edit button" />
                <p>Edit</p>
              </button>
            </>
          ) : (
            <button onClick={() => toggleReply()} className="reply-button">
              <img src="./images/icon-reply.svg" alt="reply button" />
              <p>reply</p>
            </button>
          )}
          {editOpen && (
            <button
              onClick={() => update(comment.id)}
              className="update-button"
            >
              update
            </button>
          )}
        </div>
      </div>
      {replyOpen ? (
        <div className="send-comment card">
          <textarea
            placeholder="Add a comment..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          ></textarea>
          <div className="card-footer">
            <img
              src={currentUser.image?.png}
              className="current-avatar"
              alt="user avatar"
            />
            <button onClick={() => sendReply()} className="send-button">
              reply
            </button>
          </div>
        </div>
      ) : null}
      <Replies
        comment={comment}
        replies={comment.replies}
        currentUser={currentUser}
        commentsData={commentsData}
        setCommentsData={setCommentsData}
        setModalOpen={setModalOpen}
      />
      {modalOpen && <div className="overlay"></div>}
      {modalOpen && (
        <DeleteModal
          deleteItem={() => deleteComment(comment.id)}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
};

export default Comment;
