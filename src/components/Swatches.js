import React, { useState, useEffect, useContext } from "react";
import { SquaresContext } from "./SquaresContext";
const Swatches = ({ swatchesTitle, swatchesGroup, paletteType, squareId, rowColId }) => {

  // temporary solution: default palette colors 
  // later on palette colors will come through the PaletteSettings component
  const paletteColors = ['red', 'blue', 'yellow', 'green', 'turquoise'];

  // global states
  const { editSquare, editSquares, insertedBigBlocks, editInsertedBigBlock } = useContext(SquaresContext);

  // local states
  const [color, setColor] = useState('');
  const [colorTarget, setColorTarget] = useState('');

  useEffect(() => {
    if (paletteType === 'rect' && swatchesGroup === '1') {
      setColorTarget('fillSquare');
    }
    if (paletteType === 'hstUp' && swatchesGroup === '1') {
      setColorTarget('fillHstLup');
    }
    if (paletteType === 'hstUp' && swatchesGroup === '2') {
      setColorTarget('fillHstRup');
    }
    if (paletteType === 'hstDown' && swatchesGroup === '1') {
      setColorTarget('fillHstLdown');
    }
    if (paletteType === 'hstDown' && swatchesGroup === '2') {
      setColorTarget('fillHstRdown');
    }
    if (paletteType === 'sashColumn' && swatchesGroup === '1') {
      setColorTarget('fillSashing');
    }
    if (paletteType === 'sashRow' && swatchesGroup === '1') {
      setColorTarget('fillSashing');
    }
    if (paletteType === 'bigBlockCol2' && swatchesGroup === '1') {
      setColorTarget('color1');
    }
    if (paletteType === 'bigBlockCol2' && swatchesGroup === '2') {
      setColorTarget('color2');
    }
    if (paletteType === 'bigBlockCol3' && swatchesGroup === '1') {
      setColorTarget('color1');
    }
    if (paletteType === 'bigBlockCol3' && swatchesGroup === '2') {
      setColorTarget('color2');
    }
    if (paletteType === 'bigBlockCol3' && swatchesGroup === '3') {
      setColorTarget('color3');
    }
  }, [paletteType]);

  const pickColor = (pickedColor) => {
    setColor(pickedColor);
  };

  useEffect(() => {
    if (paletteType === 'sashColumn') {
      editSquares({
        rowCol: 'col',
        id: rowColId,
        propertyKey: colorTarget,
        propertyValue: color
      });
    } else if (paletteType === "sashRow") {
      editSquares({
        rowCol: 'row',
        id: rowColId,
        propertyKey: colorTarget,
        propertyValue: color
      });
    } else if (paletteType === "bigBlockCol2" || paletteType === "bigBlockCol3") {
      let insIndex = insertedBigBlocks.indexOf(insertedBigBlocks.find(block => block.anchorSquare === squareId));
      let colorTargetProp = colorTarget;
      editInsertedBigBlock({
        ...insertedBigBlocks[insIndex],
        [colorTargetProp]: color,
      })
    } else {
      editSquare({
        id: squareId,
        propertyKey: colorTarget,
        propertyValue: color
      });
    }
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