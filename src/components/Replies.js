import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import DeleteModal from "./DeleteModal";

function formatRelativeTime(timestamp) {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}

const Replies = ({
  comment,
  replies,
  currentUser,
  commentsData,
  setCommentsData,
}) => {
  const [replyContent, setReplyContent] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [openReplyID, setOpenReplyID] = useState(null);
  const [editingReplyID, setEditingReplyID] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const deleteReply = (replyID) => {
    const updatedComments = commentsData.map((comment) => ({
      ...comment,
      replies: comment.replies.filter((reply) => reply.id !== replyID),
    }));
    setCommentsData(updatedComments);
    setModalOpen(false);
  };

  const toggleReply = (replyID) => {
    setOpenReplyID((prevID) => (prevID === replyID ? null : replyID));
  };

  const toggleEdit = (replyID, content) => {
    setEditingReplyID(replyID === editingReplyID ? null : replyID);
    if (replyID !== editingReplyID) {
      setEditedContent(content);
    }
  };

  const upvote = (commentID, replyID) => {
    const updatedComments = commentsData.map((c) =>
      c.id === commentID
        ? {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyID ? { ...r, score: r.score + 1 } : r,
            ),
          }
        : c,
    );

    setCommentsData(updatedComments);
  };

  const downvote = (commentID, replyID) => {
    const updatedComments = commentsData.map((c) =>
      c.id === commentID
        ? {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyID ? { ...r, score: Math.max(0, r.score - 1) } : r,
            ),
          }
        : c,
    );

    setCommentsData(updatedComments);
  };

  const sendReply = (reply) => {
    const newReply = {
      id: comment.replies.length + 1,
      content: replyContent,
      createdAt: formatRelativeTime(Date.now()),
      replyingTo: reply.user.username,
      score: 0,
      user: currentUser,
    };
    const updatedComments = commentsData.map((c) =>
      c.id === comment.id ? { ...c, replies: [...c.replies, newReply] } : c,
    );
    setCommentsData(updatedComments);
    setOpenReplyID(null);
    setReplyContent("");
  };

  const update = (commentID, replyID, content) => {
    const updatedComments = commentsData.map((c) => {
      if (c.id === commentID) {
        return {
          ...c,
          replies: c.replies.map((r) =>
            r.id === replyID ? { ...r, content: editedContent } : r,
          ),
        };
      } else {
        return c;
      }
    });
    setCommentsData(updatedComments);
    setEditingReplyID(null);
  };

  return (
    <>
      <div className="replies">
        {replies.map((reply) => {
          const { id, user, createdAt, content, score, replyingTo } = reply;

          return (
            <>
              <div key={id} className="card">
                <div className="card-header">
                  <div className="user-avatar">
                    <img src={user.image.png} alt={user.username} />
                  </div>
                  <p className="username">{user.username}</p>
                  {reply.user.username === currentUser.username && (
                    <p className="you">you</p>
                  )}
                  <p className="createdAt">{createdAt}</p>
                </div>
                <p className="content">
                  <span className="replyingTo">@{replyingTo}</span>
                  {editingReplyID === reply.id ? (
                    <textarea
                      className="edit-textarea"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    ></textarea>
                  ) : (
                    content
                  )}
                </p>
                <div className="card-footer">
                  <div className="count-button-div">
                    <button onClick={() => upvote(comment.id, reply.id)}>
                      <img
                        src="./images/icon-plus.svg"
                        alt="plus count button"
                      />
                    </button>
                    <p className="count">{score}</p>
                    <button
                      onClick={() => downvote(comment.id, reply.id)}
                      className="minus-btn"
                    >
                      <img
                        src="./images/icon-minus.svg"
                        alt="minus count button"
                      />
                    </button>
                  </div>
                  {currentUser.username === user.username ? (
                    <>
                      <button
                        onClick={() => setModalOpen(true)}
                        className="delete-button"
                      >
                        <img
                          src="./images/icon-delete.svg"
                          alt="delete button"
                        />
                        <p>Delete</p>
                      </button>
                      <button
                        onClick={() => toggleEdit(reply.id, reply.content)}
                        className="edit-button"
                      >
                        <img src="./images/icon-edit.svg" alt="edit button" />
                        <p>Edit</p>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => toggleReply(reply.id)}
                      className="reply-button"
                    >
                      <img src="./images/icon-reply.svg" alt="reply button" />
                      <p>Reply</p>
                    </button>
                  )}
                  {editingReplyID === reply.id && (
                    <button
                      onClick={() =>
                        update(comment.id, reply.id, reply.content)
                      }
                      className="update-button"
                    >
                      update
                    </button>
                  )}
                </div>
              </div>

              {openReplyID === reply.id && (
                <div className="send-comment card">
                  <textarea
                    placeholder="Add a comment..."
                    onChange={(e) => setReplyContent(e.target.value)}
                  ></textarea>
                  <div className="card-footer">
                    <img
                      src={currentUser.image?.png}
                      className="current-avatar"
                      alt="user avatar"
                    />
                    <button
                      onClick={() => sendReply(reply)}
                      className="send-button"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
              {modalOpen && <div className="overlay"></div>}
              {modalOpen && (
                <DeleteModal
                  deleteItem={() => deleteReply(reply.id)}
                  setModalOpen={setModalOpen}
                />
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default Replies;
