import React from "react";
import ReactDom from "react-dom";

const Modal = ({ closeModal, modalIsOpen, children }) => {

  return ReactDom.createPortal(
    <>
      <div className={`modal ${modalIsOpen === true ? "active" : ""}`}>
        <div className="modal-container">
          <div className="modal-header">
            <button
              className="btn btn-clear float-right"
              aria-label="Close"
              onClick={() => closeModal()}
            ></button>
          </div>
          <div className="modal-body">
            <div className="content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modals')
  )
};

export default Modal;