import React from "react";

const Message = ({ text, closeMessage }) => {
  return (
    <>
      <div className="toast toast-error">
        <button
          className="btn btn-clear float-right"
          onClick={closeMessage}
        ></button>
        <p className="text">{text}</p>
      </div>
    </>
  );
};

export default Message;
