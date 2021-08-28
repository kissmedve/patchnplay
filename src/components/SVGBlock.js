import React from "react";
import elementBlocks from "../data/elementBlocks";
import SVGPath from "./SVGPath";

const SVGBlock = ({ blockId, color1, color2, color3 }) => {

  const bigBlock = elementBlocks.find(block => block.id === blockId);

  let renderedBlock = (bigBlock && bigBlock.paths.length > 0) ?
    bigBlock.paths.map((path, index) =>
      <SVGPath vertices={path.vertices} fillColor={path.fillColor} color1={color1} color2={color2} color3={color3} key={index} />)
    : null;

  return (
    <svg viewBox="0 0 150 150" width="100%" >

      {
        renderedBlock ? renderedBlock : null
      }

    </svg>
  )

};

export default SVGBlock;