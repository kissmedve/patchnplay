import React, { useState } from "react";
import Modal from "./Modal";
import ColorSettingsPalette from "./ColorSettingsPalette";
import BigBlockGallery from "./BigBlockGallery";

const Navigation = () => {

  // local states
  const [colorsModalIsOpen, setColorsModalIsOpen] = useState(false);
  const [premadesModalIsOpen, setPremadesModalIsOpen] = useState(false);

  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <button className="btn btn-link" onClick={() => setColorsModalIsOpen(!colorsModalIsOpen)}>
            <img src="icon-colors.svg" alt="Colors" />
            <span>Colors</span>
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link" onClick={() => setPremadesModalIsOpen(!premadesModalIsOpen)}>
            <img src="icon-premades.svg" alt="Premades" />
            <span>Premades</span>
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
        modalIsOpen={colorsModalIsOpen}
        closeModal={() => setColorsModalIsOpen(false)} >
        <ColorSettingsPalette />
      </Modal>
      <Modal
        modalIsOpen={premadesModalIsOpen}
        closeModal={() => setPremadesModalIsOpen(false)} >
        <BigBlockGallery />
      </Modal>
    </>
  )
}

export default Navigation;