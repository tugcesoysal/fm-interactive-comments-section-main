const DeleteModal = ({ setModalOpen, deleteItem }) => {
  return (
    <div className="modal">
      <h1>Delete comment</h1>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can`t be undone.
      </p>
      <button onClick={() => setModalOpen(false)} className="cancel">
        no, cancel
      </button>
      <button onClick={() => deleteItem()} className="delete">
        yes, delete
      </button>
    </div>
  );
};

export default DeleteModal;
