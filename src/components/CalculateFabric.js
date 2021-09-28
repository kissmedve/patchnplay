import React, { useContext, useState } from "react";
import { SquaresContext } from "./SquaresContext";
import elementBlocks from "../data/elementBlocks";

const CalculateFabric = () => {

  // global states
  const { squares, insertedBigBlocks, sashingCols, sashingRows, borders, squareWidth, borderBaseWidth, sashingWidths, sashingHeights, sashingColsColor, sashingRowsColor } = useContext(SquaresContext);

  // local states

  const collectRegularSizeSquares = () => {
    return squares.map(squs => {
      return squs.filter(squ => squ.squareType === 'rect' && squ.sashing === false && squ.covered === false).map(squ => squ.fillSquare)
    })
  };

  const collectRegularSizeTriangles = () => {
    return squares.map(squs => {
      let triangles = [];
      squs.filter(squ => squ.covered === false && (squ.squareType === 'hstUp' || squ.squareType === 'hstDown')).map(squ => {
        if (squ.squareType === 'hstUp') {
          triangles.push(squ.fillHstLup, squ.fillHstRup);
        };
        if (squ.squareType === 'hstDown') {
          triangles.push(squ.fillHstLdown, squ.fillHstRdown);
        };
      });
      return triangles;
    })
  };
  console.log(collectRegularSizeSquares(), collectRegularSizeTriangles());

  const collectBigBlockSquares = () => {
    return insertedBigBlocks.map(block => {
      const coll = {};
      coll.color1 = block.color1;
      coll.color2 = block.color2;
      coll.color3 = block.color3;
      coll.sizeFactor = block.stretchSquares / block.rowCol;
      coll.squaresColor1 = block.squaresColor1;
      coll.squaresColor2 = block.squaresColor2;
      coll.squaresColor3 = block.squaresColor3;
      coll.trianglesColor1 = block.trianglesColor1;
      coll.trianglesColor2 = block.trianglesColor2;
      coll.trianglesColor3 = block.trianglesColor3;
      return coll;
    })
  }
  console.log(collectBigBlockSquares());

  //const collectSashings = () => {
  let sashRowPiecesBase = [];
  let countR = 0;
  for (let i = 0; i < sashingCols.length; i++) {
    if (sashingCols[i] === false) {
      countR = countR + 1;
    }
    if (sashingCols[i] === true) {
      sashRowPiecesBase.push(countR);
      countR = 0;
    }
    if (i === sashingCols.length - 1) {
      if (countR > 0) {
        sashRowPiecesBase.push(countR);
      }
    }
  }
  console.log('sashRowPiecesBase', sashRowPiecesBase);

  let sashColPiecesBase = [];
  let countC = 0;
  for (let i = 0; i < sashingRows.length; i++) {
    if (sashingRows[i] === false) {
      countC = countC + 1;
    }
    if (sashingRows[i] === true) {
      sashColPiecesBase.push(countC);
      countC = 0;
    }
    if (i === sashingRows.length - 1) {
      if (countC > 0) {
        sashColPiecesBase.push(countC);
      }
    }
  }
  console.log('sashColPiecesBase', sashColPiecesBase);

  let indexedSashCols = sashingCols.map((col, index) => col === true ? index : null).filter(col => col !== null);
  let indexedSashRows = sashingRows.map((row, index) => row === true ? index : null).filter(row => row !== null);
  console.log('indexedSashCols', indexedSashCols, 'indexedSashRows', indexedSashRows);

  // sashing row pieces (without crossings)
  let sashRowPieces = indexedSashRows.map((row, indexR) => {
    return sashRowPiecesBase.map(base => {
      let piece = {};
      piece.width = base * squareWidth;
      piece.height = squareWidth * sashingHeights[indexedSashRows[indexR]];
      piece.color = sashingRowsColor[indexedSashRows[indexR]];
      return piece;
    });
  });

  // sashing column pieces (without crossings)
  let sashColPieces = indexedSashCols.map((col, indexC) => {
    return sashColPiecesBase.map(base => {
      let piece = {};
      piece.width = squareWidth * sashingWidths[indexedSashCols[indexC]];
      piece.height = base * squareWidth;
      piece.color = sashingColsColor[indexedSashCols[indexC]];
      return piece;
    });
  });

  // sashing crossings, if not covered by BigBlock
  let sashCrossings = squares.map(squs => {
    return squs.filter(squ => squ.sashingCrossed === true && squ.covered === false).map(squ => {
      let piece = {};
      piece.width = squ.sashingWidth * squareWidth;
      piece.height = squ.sashingHeight * squareWidth;
      piece.color = squ.fillSashing;
      return piece;
    })
  }).reduce((acc, curr) => {
    return acc.concat(curr)
  }, []);

  const collectBorderPieces = () => {
    let allBorderPieces = [];
    const squaresGridWidth = sashingWidths.reduce((acc, curr) => acc + curr) * squareWidth;
    const squaresGridHeight = sashingHeights.reduce((acc, curr) => acc + curr) * squareWidth;
    const revBorders = borders.reverse();

    const collectPieces = (revBorders, i = 0) => {

      if (i >= revBorders.length) { return; }

      const borderTopPiece = {
        type: 'borderTop',
        width: i > 0 ? squaresGridWidth + revBorders[i - 1].borderLeftPiece + revBorders[i - 1].borderRightPiece : squaresGridWidth,
        height: revBorders[i].widthTop * borderBaseWidth,
        color: revBorders[i].background,
      };
      const borderBottomPiece = {
        type: 'borderBottom',
        width: i > 0 ? squaresGridWidth + revBorders[i - 1].borderLeftPiece + revBorders[i - 1].borderRightPiece : squaresGridWidth,
        height: revBorders[i].widthBottom * borderBaseWidth,
        color: revBorders[i].background,
      };
      const borderRightPiece = {
        type: 'borderRight',
        width: revBorders[i].widthRight * borderBaseWidth,
        height: i > 0 ? squaresGridHeight + revBorders[i - 1].borderTopPiece + revBorders[i - 1].borderBottomPiece : squaresGridHeight,
        color: revBorders[i].background,
      };
      const borderLeftPiece = {
        type: 'borderLeft',
        width: revBorders[i].widthLeft * borderBaseWidth,
        height: i > 0 ? squaresGridHeight + revBorders[i - 1].borderTopPiece + revBorders[i - 1].borderBottomPiece : squaresGridHeight,
        color: revBorders[i].background,
      }
      const cornerLeftTopPiece = {
        type: 'cornerLeftTop',
        width: revBorders[i].widthLeft * borderBaseWidth,
        height: revBorders[i].widthTop * borderBaseWidth,
        color: revBorders[i].background,
      }
      const cornerRightTopPiece = {
        type: 'cornerRightTop',
        width: revBorders[i].widthRight * borderBaseWidth,
        height: revBorders[i].widthTop * borderBaseWidth,
        color: revBorders[i].background,
      }
      const cornerLeftBottomPiece = {
        type: 'cornerLeftBottom',
        width: revBorders[i].widthLeft * borderBaseWidth,
        height: revBorders[i].widthBottom * borderBaseWidth,
        color: revBorders[i].background,
      }
      const cornerRightBottomPiece = {
        type: 'cornerRightBottom',
        width: revBorders[i].widthRight * borderBaseWidth,
        height: revBorders[i].widthBottom * borderBaseWidth,
        color: revBorders[i].background,
      }
      allBorderPieces.push(borderTopPiece, borderBottomPiece, borderRightPiece, borderLeftPiece, cornerLeftTopPiece, cornerRightTopPiece, cornerLeftBottomPiece, cornerRightBottomPiece);

      return collectPieces(revBorders, i + 1);
    }
    collectPieces(revBorders);
    return allBorderPieces;
  }

  console.log('sashRowPieces', sashRowPieces);
  console.log('sashColPieces', sashColPieces);
  console.log('sashCrossings', sashCrossings);
  console.log('collectBorderPieces()', collectBorderPieces());


  return (
    <></>
  )
}

export default CalculateFabric;