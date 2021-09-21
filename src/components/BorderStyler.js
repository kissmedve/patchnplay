import React, { useState, useContext, useEffect } from "react";
import Palette from './Palette';
import { StylersContext } from "./StylersContext";
import { SquaresContext } from "./SquaresContext";

const BorderStyler = () => {

  // global states
  const { squareWidth, borders, updateBorders, editBorder } = useContext(SquaresContext);
  const { closeBorderStyler } = useContext(StylersContext);

  // local states
  const [selectedBorder, setSelectedBorder] = useState('');
  const [borderData, setBorderData] = useState({
    pos: '',
    widthTop: 1,
    widthRight: 1,
    widthBottom: 1,
    widthLeft: 1,
    background: '',
  });

  const addBorder = (pos) => {
    let newBorders = [];
    borders.forEach(border => {
      if (border.pos > pos) { border.pos = border.pos + 1 };
      newBorders.push(border);
    })
    newBorders.push(
      {
        pos: pos + 1,
        background: '#eee',
        widthTop: 1,
        widthRight: 1,
        widthBottom: 1,
        widthLeft: 1,
      }
    );
    newBorders.sort((a, b) => { return a.pos - b.pos });
    updateBorders(newBorders);
  };

  const deleteBorder = (pos) => {
    let newBorders = borders.filter(border => border.pos !== pos);
    newBorders.forEach(border => {
      if (border.pos > pos) { border.pos = border.pos - 1 }
    });
    updateBorders(newBorders);
  };
  const selectBorder = (pos) => {
    setSelectedBorder(pos);
    let activeBorder = borders.find(border => border.pos === pos);
    setBorderData({
      pos: activeBorder.pos,
      widthTop: activeBorder.widthTop,
      widthRight: activeBorder.widthRight,
      widthBottom: activeBorder.widthBottom,
      widthLeft: activeBorder.widthLeft,
      background: activeBorder.background,
    })
  };

  const handleInputBorderWidth = (event) => {
    setBorderData({ ...borderData, [event.target.name]: parseInt(event.target.value) });
  }

  useEffect(() => {
    editBorder(borderData);
  }, [borderData]);

  const borderHandlingDisplay = () => {
    const widthCore = 40;
    const heightEachVisible = 30;
    const offsetLeftVisible = 5;
    let widest = borders.length < 5 ? 70 : widthCore + (borders.length - 1) * offsetLeftVisible;

    let iconWidth, iconHeight, iconTopMargin, iconLeftMargin = 0;
    let bgImage = '';

    return borders.map(border => {
      if (border.pos === 0) {
        iconWidth = widest;
        iconTopMargin = 0;
      } else {
        iconWidth = widest - border.pos * offsetLeftVisible;
        iconTopMargin = heightEachVisible * (borders.length - border.pos) * (-1);
      };
      iconHeight = heightEachVisible * (borders.length - border.pos);
      iconLeftMargin = offsetLeftVisible * border.pos;
      bgImage = selectedBorder !== '' && selectedBorder !== border.pos ? `url(bg-white-05.svg)` : `url(bg-00.svg)`;

      return (
        <div className="border-button-group" key={border.pos} style={{ marginTop: `${iconTopMargin}px`, marginLeft: `${iconLeftMargin}px` }}>
          <div className="border-icon" style={{ width: `${iconWidth}px`, height: `${iconHeight}px`, backgroundColor: `${border.background}`, backgroundImage: `${bgImage}` }} ></div>
          <button className="btn edit-border" onClick={() => selectBorder(border.pos)}><span>Edit Border</span></button>
          <button className="btn add-border" onClick={() => addBorder(border.pos)}><span>Add Border</span></button>
          <button className="btn delete-border" onClick={() => deleteBorder(border.pos)}><span>Delete Border</span></button>
        </div>
      )
    })
  };

  return (
    <>
      <div className="styling-dropdown popup active" style={{ left: (squareWidth - 18) + `px`, top: (squareWidth - 18) + `px` }} >

        <div className="card ">

          <button className="btn btn-clear" aria-label="Close" onClick={closeBorderStyler} ></button>

          <div className="card-body">
            <div className="card-title h5">Border</div>

            {borders.length > 0 ?
              <div className="border-select">
                {borderHandlingDisplay()}
              </div>
              :
              <button className="btn border-add" onClick={addBorder} >Add Border</button>
            }

            {borders.length === 1 || selectedBorder !== '' ?
              <>
                <div className="card-title h6">Widths</div>
                <div className="form-group border-sizes">

                  <div className="form-group border-width">
                    <div className="expl">Top</div>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      name="widthTop"
                      value={borderData.widthTop}
                      onChange={handleInputBorderWidth}
                    />
                  </div>

                  <div className="form-group border-width">
                    <div className="expl">Right</div>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      name="widthRight"
                      value={borderData.widthRight}
                      onChange={handleInputBorderWidth}
                    />
                  </div>

                  <div className="form-group border-width">
                    <div className="expl">Bottom</div>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      name="widthBottom"
                      value={borderData.widthBottom}
                      onChange={handleInputBorderWidth}
                    />
                  </div>

                  <div className="form-group border-width">
                    <div className="expl">Left</div>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      name="widthLeft"
                      value={borderData.widthLeft}
                      onChange={handleInputBorderWidth}
                    />
                  </div>

                </div>

                <Palette paletteType={'border'} borderPos={selectedBorder} />
              </>
              : null}


          </div>

        </div>

      </div>
    </>
  )
}

export default BorderStyler;