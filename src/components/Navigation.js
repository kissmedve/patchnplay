import React, { useState, useContext } from "react";
import Modal from "./Modal";
import ColorSettingsPalette from "./ColorSettingsPalette";
import BigBlockGallery from "./BigBlockGallery";
import DownloadJSON from "./DownloadJSON";
import UploadJSON from "./UploadJSON";
import PrintableSquaresGrid from "./PrintableSquaresGrid";
import CalculateFabricForm from "./CalculateFabricForm";
import { FabricsContext } from "./FabricsContext";

const Navigation = () => {
  // global states
  const { calcFabricModalIsOpen, setCalcFabricModalIsOpen } =
    useContext(FabricsContext);
  // local states
  const [colorsModalIsOpen, setColorsModalIsOpen] = useState(false);
  const [premadesModalIsOpen, setPremadesModalIsOpen] = useState(false);
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <>
      <section
        id="topnav"
        className={openMobileMenu === true ? `active` : null}
      >
        <div
          id="toggler"
          className={openMobileMenu === true ? `toggled` : null}
        >
          <button onClick={() => setOpenMobileMenu(!openMobileMenu)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <button
              className="btn btn-link"
              onClick={() => setColorsModalIsOpen(!colorsModalIsOpen)}
            >
              <img src="icon-colors.svg" alt="Colors" />
              <span>Colors</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link"
              onClick={() => setPremadesModalIsOpen(!premadesModalIsOpen)}
            >
              <img src="icon-premades.svg" alt="Premades" />
              <span>Premades</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link"
              onClick={() => setPreviewModalIsOpen(!previewModalIsOpen)}
            >
              <img src="icon-preview.svg" alt="Preview" />
              <span>Preview</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link"
              onClick={() => setCalcFabricModalIsOpen(true)}
            >
              <img src="icon-calc.svg" alt="Calculate" />
              <span>Calculate</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link"
              onClick={() => setUploadModalIsOpen(!uploadModalIsOpen)}
            >
              <img src="icon-upload.svg" alt="Upload" />
              <span>Upload</span>
            </button>
          </li>
          <li className="nav-item">
            <DownloadJSON />
          </li>
        </ul>
      </section>
      <Modal
        modalIsOpen={colorsModalIsOpen}
        closeModal={() => setColorsModalIsOpen(false)}
      >
        <ColorSettingsPalette />
      </Modal>
      <Modal
        modalIsOpen={premadesModalIsOpen}
        closeModal={() => setPremadesModalIsOpen(false)}
      >
        <BigBlockGallery />
      </Modal>
      <Modal
        modalIsOpen={previewModalIsOpen}
        closeModal={() => setPreviewModalIsOpen(false)}
      >
        <PrintableSquaresGrid />
      </Modal>
      <Modal
        modalIsOpen={calcFabricModalIsOpen}
        closeModal={() => setCalcFabricModalIsOpen(false)}
      >
        <CalculateFabricForm />
      </Modal>
      <Modal
        modalIsOpen={uploadModalIsOpen}
        closeModal={() => setUploadModalIsOpen(false)}
      >
        <UploadJSON />
      </Modal>
    </>
  );
};

export default Navigation;
