import React, { useContext, useState } from "react";
import { ColorsContext } from "./ColorsContext";
import { ChromePicker } from 'react-color';

const ColorSettingsPalette = () => {

  // global states
  const { paletteColors, addColor, deleteColor } = useContext(ColorsContext);

  // local states
  const [currentColor, setCurrentColor] = useState('transparent');
  const [clickedColor, setClickedColor] = useState('transparent');

  const swatchesList = paletteColors.map((pcolor, index) => (
    <button
      className="swatch"
      style={{ background: pcolor }}
      key={index}
      onClick={() => setClickedColor(pcolor)} />
  ))
  const defineCurrentColor = (color, event) => {
    setCurrentColor(color.hex);
  }
  const addToColors = (event) => {
    if (currentColor !== 'transparent') {
      addColor(currentColor);
      setCurrentColor('transparent');
    }
  }
  const removeFromColors = (event) => {
    deleteColor(clickedColor);
    setClickedColor('transparent');
  }
  const addSwatchesBorder = currentColor === 'transparent' ? 'dashed 1px #333' : 'solid 1px transparent';
  const removeSwatchesBorder = clickedColor === 'transparent' ? 'dashed 1px #333' : 'solid 1px transparent';
  const swatchesGroupStyle= paletteColors.length < 1 ? {border:'dashed 1px #333', width: '7.5rem', height: '1.25rem'} : {border: 'solid 1px transparent'};

  return (
    <>
      <div className="card colors">
        <div className="card-header">
          <div className="card-title h5">Pick Colours</div>
        </div>
        <div className="card-body">
          <div className="columns">
            <div className="column col-6">
              <ChromePicker color={currentColor} onChange={defineCurrentColor} />
            </div>
            <div className="column col-6">

              <div className="h6">Current Colour</div>
              <div className="swatch-action">
                <div className="swatch current-color" style={{ background: currentColor, border: addSwatchesBorder }} ></div>

                <button className="btn add-color" onClick={addToColors} >Add to Palette</button>
              </div>

              <div className="h6">Custom Palette</div>
              <div className="swatches-group" style={swatchesGroupStyle}>
                {swatchesList}
              </div>
              <div className="swatch-action">
                <div className="swatch remove-color" style={{ background: clickedColor, border: removeSwatchesBorder }} ></div>
                <button className="btn remove-color" onClick={removeFromColors}>Remove Colour</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ColorSettingsPalette;
