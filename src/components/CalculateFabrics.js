import React, { useContext } from "react";
import { FabricsContext } from "./FabricsContext";
import CollectPieces from "./CollectPieces";

const CalculateFabrics = () => {
  // global states
  const { fabricWidths } = useContext(FabricsContext);

  // fabricWidth assigned to the color of the current row
  const findFabricWidth = (col) => {
    if (fabricWidths.length > 0) {
      let currentFW = fabricWidths.find((fw) => fw.color === col);
      return currentFW.fabricWidth;
    }
    return 110; // standard width for quilt fabrics
  };

  const objects = CollectPieces();

  let widthSum = 0;
  let heightStart = 0;
  let heightSum = 0;
  let row = {};

  let drawnObjects = [];

  // we walk through all objects of one color
  // first we walk through all objects of one height
  // we create rows as we go, composed of objects of svg arrays, height, and remaining width
  // for each piece we start at the first row of the color,
  // for each row we compare height and remaining width, and push new svg array accordingly
  // for each svg created we reduce the respective piece count by 1
  // when all objects of one height have piece count 0, we proceed to the next height
  // we adjust the currentHeight to the new height
  // when all objects of one color have piece count 0, we proceed to the next color
  // we adjust the currentColor to the next color

  const allColors = objects.map((obj) => obj.color);
  const allDistinctColors = [...new Set(allColors)];

  allDistinctColors.forEach((color) => {
    let objectsByColor = objects.filter((object) => object.color === color);

    objectsByColor.forEach((object) => {
      let currentFabricWidth = findFabricWidth(object.color);

      // split up objects that are wider than the respective currentFabricWidth
      if (object.width > currentFabricWidth) {
        let fractions = Math.ceil(object.width / currentFabricWidth);
        object.width = (object.width / fractions).toFixed(2);
        object.pieces = object.pieces * fractions;
      }

      // recursive function
      const draw = (object, heightSum) => {
        // prepare values
        let objectWidth = parseFloat(object.width);
        let objectHeight = parseFloat(object.height);
        widthSum = parseFloat(widthSum);
        heightStart = parseFloat(heightStart);
        heightSum = parseFloat(heightSum);

        // available objects (= rows) to receive a piece
        let targetDrawnObjects = drawnObjects.filter(
          (obj) =>
            obj.color === object.color &&
            obj.height === object.height &&
            obj.remaining >= object.width
        );

        // exit condition (all pieces processed)
        if (object.pieces === 0) return;

        // regular action

        // if there is a free space in an existing row
        if (targetDrawnObjects[0]) {
          widthSum = targetDrawnObjects[0].widthSum;
          heightStart = targetDrawnObjects[0].heightStart;

          // create path
          let pathData = [
            "M",
            widthSum,
            heightStart,
            "L",
            widthSum + objectWidth,
            heightStart,
            "L",
            widthSum + objectWidth,
            heightStart + objectHeight,
            "L",
            widthSum,
            heightStart + objectHeight,
            "Z",
          ];
          let pathDataJoined = pathData.join(" ");

          // adjust processed object
          object.pieces -= 1;

          // adjust row object
          targetDrawnObjects[0].pieces.push(pathDataJoined);
          targetDrawnObjects[0].color = object.color;
          targetDrawnObjects[0].widthSum = widthSum + objectWidth;
          targetDrawnObjects[0].heightStart = heightStart;
          targetDrawnObjects[0].heightSum = heightStart + objectHeight;
          targetDrawnObjects[0].remaining =
            currentFabricWidth - targetDrawnObjects[0].widthSum;

          return draw(object, heightSum);
        }

        // if no free space in previous rows or no row yet
        if (targetDrawnObjects.length === 0) {
          widthSum = 0;
          heightStart =
            drawnObjects.length > 0 &&
            drawnObjects[drawnObjects.length - 1].color === object.color
              ? drawnObjects[drawnObjects.length - 1].heightSum
              : 0;

          // create path
          let pathData = [
            "M",
            widthSum,
            heightStart,
            "L",
            widthSum + objectWidth,
            heightStart,
            "L",
            widthSum + objectWidth,
            heightStart + objectHeight,
            "L",
            widthSum,
            heightStart + objectHeight,
            "Z",
          ];
          let pathDataJoined = pathData.join(" ");

          // adjust processed object
          object.pieces -= 1;

          // add new row object
          row = {
            color: object.color,
            height: objectHeight,
            widthSum: objectWidth,
            heightStart: heightStart,
            heightSum: heightStart + objectHeight,
            pieces: [pathDataJoined],
            remaining: currentFabricWidth - objectWidth,
          };
          drawnObjects.push(row);

          return draw(object, heightSum);
        }
      };
      draw(object, heightSum);
    });
  });

  const drawPacks = allDistinctColors.map((color, index) => {
    const drawnObjectsByColor = drawnObjects.filter(
      (obj) => obj.color === color
    );
    let currentFabricWidth = findFabricWidth(color);

    let piecesToDraw = [];
    drawnObjectsByColor.forEach((obj) => {
      piecesToDraw.push(obj.pieces);
    });
    piecesToDraw = piecesToDraw.reduce((acc, curr) => acc.concat(curr), []);

    const svgHeight =
      drawnObjectsByColor[drawnObjectsByColor.length - 1].heightSum;

    return [color, svgHeight, piecesToDraw, currentFabricWidth];
  });

  const drawAll = drawPacks.map((pack, index) => {
    return (
      <>
        <div key={index}>
          <div style={{ marginTop: "1.5rem" }}>
            <span
              style={{
                height: "1.4rem",
                width: "4rem",
                background: `${pack[0]}`,
                display: "inline-block",
                marginRight: "0.5rem",
              }}
            ></span>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            Color: {pack[0]} <br />
            Fabric width: {pack[3]} cm <br />
            Required height: {pack[1]} cm
          </div>

          <svg viewBox={`0 0 140 ${pack[1]}`}>
            <g>
              <path
                d={`M 0 0 L ${pack[3]} 0 L ${pack[3]} ${pack[1]} L 0 ${pack[1]} Z`}
                stroke="#666"
                strokeWidth="0.2"
                fill="#eee"
              />
              {pack[2].map((p, i) => {
                return (
                  <path
                    d={p}
                    stroke="black"
                    fill="white"
                    strokeWidth="0.2"
                    key={i}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      </>
    );
  });

  return <>{drawAll}</>;
};

export default CalculateFabrics;
