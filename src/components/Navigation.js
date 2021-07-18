import React, { useState } from "react";
import Modal from "./Modal";
import ColorSettingsPalette from "./ColorSettingsPalette";

const Navigation = () => {

  // local states
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <button className="btn btn-link" onClick={() => setModalIsOpen(!modalIsOpen)}>
            <img src="icon-colors.svg" alt="Colors" />
            <span>Colors</span>
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link" >
            <img src="icon-upload.svg" alt="Upload" />
            <span>Upload</span>
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link" >
            <img src="icon-download.svg" alt="Download" />
            <span>Download</span>
          </button>
        </li>

      </ul>
      <Modal
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)} >
        <ColorSettingsPalette />
      </Modal>
    </>
  )
}

export default Navigation;