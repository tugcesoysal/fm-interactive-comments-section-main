import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

function formatRelativeTime(timestamp) {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}

const SendComment = ({ currentUser, commentsData, setCommentsData }) => {
  const [newCommentContent, setNewCommentContent] = useState("");

  const sendComment = () => {
    try {
      const newComment = {
        id: commentsData.length + 1,
        content: newCommentContent,
        createdAt: formatRelativeTime(new Date()),
        score: 0,
        user: currentUser,
        replies: [],
      };

      const updatedComments = [...commentsData, newComment];
      setCommentsData(updatedComments);
      setNewCommentContent("");
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  return (
    <div className="send-comment card">
      <textarea
        placeholder="Add a comment..."
        value={newCommentContent}
        onChange={(e) => setNewCommentContent(e.target.value)}
      ></textarea>
      <div className="card-footer">
        <img
          src={currentUser.image?.png}
          className="current-avatar"
          alt="user avatar"
        />
        <button onClick={sendComment} className="send-button">
          send
        </button>
      </div>
    </div>
  );
};

export default SendComment;
