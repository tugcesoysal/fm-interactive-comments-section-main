import React, { useState } from "react";
import CommentList from "./components/CommentList";
import SendComment from "./components/SendComment";

import data from "./data.json";

function App() {
  const [currentUser, setCurrentUser] = useState(data.currentUser);
  const [commentsData, setCommentsData] = useState(data.comments);

  return (
    <div className="App">
      <CommentList
        currentUser={currentUser}
        commentsData={commentsData}
        setCommentsData={setCommentsData}
      />
      <SendComment
        currentUser={currentUser}
        commentsData={commentsData}
        setCommentsData={setCommentsData}
      />
    </div>
  );
}

export default App;
