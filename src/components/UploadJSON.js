import React, { useContext, useState } from "react";
import { SquaresContext } from "./SquaresContext";
import { BigBlocksContext } from "./BigBlocksContext";
import { ColorsContext } from "./ColorsContext";

const UploadJSON = () => {

  // global states
  const { updateSquares, updateCols, updateRows, updateSashingCols, updateSashingRows, updateSashingWidths, updateSashingHeights, updateInsertedBigBlocks, updateBorders } = useContext(SquaresContext);
  const { updateBigBlocks } = useContext(BigBlocksContext);
  const { updateColors } = useContext(ColorsContext);

  // local state
  const [selectedFile, setSelectedFile] = useState('');

  const onFileChange = (event) => {

    let file = event.target.files[0];
    if (file.type === "application/json") {
      setSelectedFile(file);
    } else {
      console.log('File type not allowed');
    }
  }

  const onFileUpload = async (event) => {

    event.preventDefault();
    const fileData = await selectedFile.text();
    let parsedData = JSON.parse(fileData);

    console.log(parsedData);

    updateSquares(parsedData.squares);
    updateCols(parsedData.cols);
    updateRows(parsedData.rows);
    updateSashingCols(parsedData.sashingCols);
    updateSashingRows(parsedData.sashingRows);
    updateSashingWidths(parsedData.sashingWidths);
    updateSashingHeights(parsedData.sashingHeights);
    updateInsertedBigBlocks(parsedData.insertedBigBlocks);
    updateBorders(parsedData.borders);

    updateBigBlocks(parsedData.selectedBigBlocks);

    updateColors(parsedData.paletteColors);
  }

  return (
    <div className="card">

      <div className="card-body">

        <form onSubmit={onFileUpload}>
          <div className="form-group">
            <label className="form-label">Choose File
            <input
                className="form-input file-input"
                type="file"
                name="fileUpload"
                accept=".json"
                onChange={onFileChange}
              ></input>
            </label>
          </div>
          <button className="btn" type="submit" name="save" >
            Upload
            </button>
        </form>

      </div>
    </div>
  )

}

export default UploadJSON;