import React, { useState, useEffect, useContext } from "react";
import { SquaresContext } from "./SquaresContext";
import { ColorsContext } from "./ColorsContext";

const Swatches = ({ swatchesTitle, swatchesGroup, paletteType, squareId, rowColId, borderPos }) => {

  // global states
  const { editSquare, editSquares, insertedBigBlocks, editInsertedBigBlock, borders, editBorderColor, sashingColsColor, sashingRowsColor, updateSashingColsColor, updateSashingRowsColor } = useContext(SquaresContext);
  const { paletteColors } = useContext(ColorsContext);

  // local states
  const [color, setColor] = useState('');
  const [colorTarget, setColorTarget] = useState('');

  useEffect(() => {
    if (borders.length === 1) {
      setColor(borders[0].background);
    }
    if (borderPos && paletteType === 'border') {
      const incomingBorder = borders.find(border => border.pos === borderPos);
      setColor(incomingBorder.background);
    }
  }, []);

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
    if (paletteType === 'rectSashing' && swatchesGroup === '1') {
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
    if (paletteType === 'border' && swatchesGroup === '1') {
      setColorTarget('background');
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
      let newSashingColsColor = sashingColsColor.map((sashColor, index) => {
        return index === rowColId ? sashColor = color : sashColor
      });
      updateSashingColsColor(newSashingColsColor);
    } else if (paletteType === "sashRow") {
      editSquares({
        rowCol: 'row',
        id: rowColId,
        propertyKey: colorTarget,
        propertyValue: color
      });
      let newSashingRowsColor = sashingRowsColor.map((sashColor, index) => {
        return index === rowColId ? sashColor = color : sashColor
      });
      updateSashingRowsColor(newSashingRowsColor);
    } else if (paletteType === "border") {
      editBorderColor({
        bPos: borderPos,
        background: color,
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