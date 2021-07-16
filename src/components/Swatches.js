import React, { useState, useEffect } from "react";

const Swatches = ({ swatchesTitle, swatchesGroup, setNewColor }) => {

  // temporary solution: default palette colors 
  // later on palette colors will come through the PaletteSettings component
  const paletteColors = ['red', 'blue', 'yellow', 'green', 'turquoise'];

  // local states
  const [color, setColor] = useState('');

  const pickColor = (pickedColor) => {
    setColor(pickedColor);
  };

  useEffect(() => {
    setNewColor({
      swatchesGroup: swatchesGroup,
      color: color,
    });
  }, [color]);

  const swatches =
    paletteColors.map((paletteColor, index) => (
      <button
        className={`swatch swatch-${index}`}
        style={{ background: `${paletteColor}` }}
        key={index}
        onClick={() => pickColor(paletteColor)} />
    ))
    ;

  return (
    <div className="swatches-group">
      <div className="swatches-title">{swatchesTitle}</div>
      <div className="swatches">
        {swatches}
      </div>
    </div>
  )
}

export default Swatches;