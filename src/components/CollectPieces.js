import React, { useContext } from "react";
import { SquaresContext } from "./SquaresContext";
import { FabricsContext } from "./FabricsContext";

const CollectPieces = () => {
  // global states
  const {
    squares,
    insertedBigBlocks,
    sashingCols,
    sashingRows,
    borders,
    sashingWidths,
    sashingHeights,
    sashingColsColor,
    sashingRowsColor,
  } = useContext(SquaresContext);
  const { fabricWidths, fabricSquareWidth, seamAllowance } =
    useContext(FabricsContext);

  const fColors = fabricWidths.map((fabricW) => fabricW.color);
  const fabricColors = [...new Set(fColors)];

  const seamAllowance90deg = parseFloat(seamAllowance);
  // seamAllowance90deg : 0.7 -> seamAllowance45deg: 1.0
  // seamAllowance90deg : 1.0 -> seamAllowance45deg: 1.4
  const seamAllowance45deg = seamAllowance === 0.7 ? 1 : 1.4;

  const fabrSquareWidth = parseFloat(fabricSquareWidth);

  const fabricBorderBaseWidth = fabrSquareWidth / 5;

  // collect pieces by type

  // collect all regular size squares
  // return squares mapped
  // x collectRegularSizeSquares() -> colorPacks
  const collectRegularSizeSquares = () => {
    return squares.map((squs) => {
      return squs
        .filter(
          (squ) =>
            squ.squareType === "rect" &&
            squ.sashing === false &&
            squ.covered === false
        )
        .map((squ) => squ.fillSquare);
    });
  };

  // collect all regular size triangles
  // return triangles
  // x collectRegularSizeTriangles() -> colorPacks
  const collectRegularSizeTriangles = () => {
    let triangles = [];
    squares.map((squs) => {
      return squs
        .filter(
          (squ) =>
            squ.covered === false &&
            (squ.squareType === "hstUp" || squ.squareType === "hstDown")
        )
        .forEach((squ) => {
          if (squ.squareType === "hstUp") {
            triangles.push(squ.fillHstLup, squ.fillHstRup);
          } else if (squ.squareType === "hstDown") {
            triangles.push(squ.fillHstLdown, squ.fillHstRdown);
          }
        });
    });
    return triangles;
  };

  // collect all BigBlocks and extract relevant data
  // return insertedBigBlocks mapped (??)
  // x collectBigBlockPieces() -> colorPacks
  const collectBigBlockPieces = () => {
    return insertedBigBlocks.map((block) => {
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
    });
  };

  // collect sashing row pieces (without crossings)
  // all counted squares are of basic width ( = squareWidth)
  // return sashRowPieces
  const collectSashRowPieces = () => {
    let sashRowPiecesBase = [];
    let countR = 0;
    for (let i = 0; i < sashingCols.length; i++) {
      // count every row square that doesn't belong to a sashing cross
      if (sashingCols[i] === false) {
        countR = countR + 1;
      }
      // complete a sashing piece upon hitting a cross,
      // start anew
      if (sashingCols[i] === true) {
        sashRowPiecesBase.push(countR);
        countR = 0;
      }
      // after last row square complete the last sashing piece
      if (i === sashingCols.length - 1) {
        if (countR > 0) {
          sashRowPiecesBase.push(countR);
        }
      }
    }

    let indexedSashRows = sashingRows
      .map((row, index) => (row === true ? index : null))
      .filter((row) => row !== null);

    // create width / height / color object for each sashing piece
    let sashRowPieces = indexedSashRows.map((row) => {
      return sashRowPiecesBase.map((base) => {
        let piece = {};
        piece.pieceType = "sashing";
        piece.width = (base * fabrSquareWidth + 2 * seamAllowance90deg).toFixed(
          2
        );
        piece.height = (
          fabrSquareWidth * sashingHeights[row] +
          2 * seamAllowance90deg
        ).toFixed(2);
        piece.color = sashingRowsColor[row];
        return piece;
      });
    });
    return sashRowPieces;
  };

  // collect sashing column pieces (without crossings)
  // all counted squares are of basic height ( = squareWidth)
  // return sashColPieces
  const collectSashColPieces = () => {
    let sashColPiecesBase = [];
    let countC = 0;
    for (let i = 0; i < sashingRows.length; i++) {
      // count every column square that doesn't belong to a sashing cross
      if (sashingRows[i] === false) {
        countC = countC + 1;
      }
      // complete a sashing piece upon hitting a cross,
      // start anew
      if (sashingRows[i] === true) {
        sashColPiecesBase.push(countC);
        countC = 0;
      }
      // after last column square complete the last sashing piece
      if (i === sashingRows.length - 1) {
        if (countC > 0) {
          sashColPiecesBase.push(countC);
        }
      }
    }

    let indexedSashCols = sashingCols
      .map((col, index) => (col === true ? index : null))
      .filter((col) => col !== null);

    // create width / height / color object for each sashing piece
    let sashColPieces = indexedSashCols.map((col) => {
      return sashColPiecesBase.map((base) => {
        let piece = {};
        piece.pieceType = "sashing";
        piece.width = (
          fabrSquareWidth * sashingWidths[col] +
          2 * seamAllowance90deg
        ).toFixed(2);
        piece.height = (
          fabrSquareWidth * base +
          2 * seamAllowance90deg
        ).toFixed(2);
        piece.color = sashingColsColor[col];
        return piece;
      });
    });
    return sashColPieces;
  };

  // sashing crossings, if not covered by BigBlock
  // return sashCrossings
  const collectSashCrossings = () => {
    let sashCrossings = squares
      .map((squs) => {
        return squs
          .filter((squ) => squ.sashingCrossed === true && squ.covered === false)
          .map((squ) => {
            let piece = {};
            piece.pieceType = "sashingCross";
            piece.width = (
              squ.sashingWidth * fabrSquareWidth +
              2 * seamAllowance90deg
            ).toFixed(2);
            piece.height = (
              squ.sashingHeight * fabrSquareWidth +
              2 * seamAllowance90deg
            ).toFixed(2);
            piece.color = squ.fillSashing;
            return piece;
          });
      })
      .reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);
    return sashCrossings;
  };

  // borders, divided up into side pieces and corner pieces
  // return allBorderPieces
  const collectBorderPieces = () => {
    let allBorderPieces = [];
    // cumulated width of squares, hsts, sashings (everything within the grid)
    const squaresGridWidth =
      sashingWidths.reduce((acc, curr) => acc + curr) * fabrSquareWidth;
    // cumulated height of squares, hsts, sashings (everything within the grid)
    const squaresGridHeight =
      sashingHeights.reduce((acc, curr) => acc + curr) * fabrSquareWidth;
    const reverseOrderedBorders = borders.reverse();

    let baseWidths = [];
    const baseWidth = (width, boxes, i = 0) => {
      if (i >= boxes.length) return;
      if (i === 0) {
        width = squaresGridWidth;
      }
      let newWidth =
        width +
        (boxes[i].widthLeft + boxes[i].widthRight) * fabricBorderBaseWidth;
      baseWidths.push(newWidth);
      return baseWidth(newWidth, boxes, i + 1);
    };
    baseWidth(squaresGridWidth, reverseOrderedBorders);

    let baseHeights = [];
    const baseHeight = (height, boxes, i = 0) => {
      if (i >= boxes.length) return;
      if (i === 0) {
        height = squaresGridHeight;
      }
      let newHeight =
        height +
        (boxes[i].widthTop + boxes[i].widthBottom) * fabricBorderBaseWidth;
      baseHeights.push(newHeight);
      return baseHeight(newHeight, boxes, i + 1);
    };
    baseHeight(squaresGridHeight, reverseOrderedBorders);

    reverseOrderedBorders.forEach((border, i) => {
      const borderTopPiece = {
        type: "borderTop",
        width:
          i > 0
            ? (baseWidths[i - 1] + 2 * seamAllowance90deg).toFixed(2)
            : (squaresGridWidth + 2 * seamAllowance90deg).toFixed(2),
        height: (
          reverseOrderedBorders[i].widthTop * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        color: reverseOrderedBorders[i].background,
      };
      const borderBottomPiece = {
        type: "borderBottom",
        width:
          i > 0
            ? (baseWidths[i - 1] + 2 * seamAllowance90deg).toFixed(2)
            : (squaresGridWidth + 2 * seamAllowance90deg).toFixed(2),
        height: (
          reverseOrderedBorders[i].widthBottom * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        color: reverseOrderedBorders[i].background,
      };
      const borderRightPiece = {
        type: "borderRight",
        width: (
          reverseOrderedBorders[i].widthRight * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        height:
          i > 0
            ? (baseHeights[i - 1] + 2 * seamAllowance90deg).toFixed(2)
            : (squaresGridHeight + 2 * seamAllowance90deg).toFixed(2),
        color: reverseOrderedBorders[i].background,
      };
      const borderLeftPiece = {
        type: "borderLeft",
        width: (
          reverseOrderedBorders[i].widthLeft * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        height:
          i > 0
            ? (baseHeights[i - 1] + 2 * seamAllowance90deg).toFixed(2)
            : (squaresGridHeight + 2 * seamAllowance90deg).toFixed(2),
        color: reverseOrderedBorders[i].background,
      };
      const cornerLeftTopPiece = {
        type: "cornerLeftTop",
        width: (
          reverseOrderedBorders[i].widthLeft * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        height: (
          reverseOrderedBorders[i].widthTop * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        color: reverseOrderedBorders[i].background,
      };
      const cornerRightTopPiece = {
        type: "cornerRightTop",
        width: (
          reverseOrderedBorders[i].widthRight * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        height: (
          reverseOrderedBorders[i].widthTop * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        color: reverseOrderedBorders[i].background,
      };
      const cornerLeftBottomPiece = {
        type: "cornerLeftBottom",
        width: (
          reverseOrderedBorders[i].widthLeft * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        height: (
          reverseOrderedBorders[i].widthBottom * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        color: reverseOrderedBorders[i].background,
      };
      const cornerRightBottomPiece = {
        type: "cornerRightBottom",
        width: (
          reverseOrderedBorders[i].widthRight * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        height: (
          reverseOrderedBorders[i].widthBottom * fabricBorderBaseWidth +
          2 * seamAllowance90deg
        ).toFixed(2),
        color: reverseOrderedBorders[i].background,
      };
      allBorderPieces.push(
        borderTopPiece,
        borderBottomPiece,
        borderRightPiece,
        borderLeftPiece,
        cornerLeftTopPiece,
        cornerRightTopPiece,
        cornerLeftBottomPiece,
        cornerRightBottomPiece
      );
    });

    return allBorderPieces;
  };

  // return allRectangles
  // x rectanglesMerge() -> allRectangles
  const rectanglesMerge = () => {
    let allRectangles = [];

    let allSashRowPieces = collectSashRowPieces().reduce(
      (acc, curr) => acc.concat(curr),
      []
    );
    if (allSashRowPieces.length > 0) {
      allRectangles.push(allSashRowPieces);
    }

    let allSashColPieces = collectSashColPieces()
      .reduce((acc, curr) => acc.concat(curr), [])
      // make the longer side the width
      // (column heights are in general longer than column widths):
      .map((piece) => {
        let newPiece = {};
        newPiece.pieceType = piece.pieceType;
        newPiece.width = parseFloat(piece.height);
        newPiece.height = parseFloat(piece.width);
        newPiece.color = piece.color;
        return newPiece;
      });
    if (allSashColPieces.length > 0) {
      allRectangles.push(allSashColPieces);
    }

    let allSashCrossings = collectSashCrossings().reduce(
      (acc, curr) => acc.concat(curr),
      []
    );
    if (allSashCrossings.length > 0) {
      allRectangles.push(allSashCrossings);
    }

    let allBorderPieces = collectBorderPieces().map((piece) => {
      let newPiece = {};
      newPiece.pieceType = "border";
      newPiece.width =
        piece.type === "borderLeft" || piece.type === "borderRight"
          ? piece.height
          : piece.width;
      newPiece.height =
        piece.type === "borderLeft" || piece.type === "borderRight"
          ? piece.width
          : piece.height;
      newPiece.color = piece.color;
      return newPiece;
    });
    if (allBorderPieces.length > 0) {
      allRectangles.push(allBorderPieces);
    }
    return allRectangles;
  };

  // ==========================

  // collect counted groups
  // (rectangles, regular size squares, regular size triangles, BigBlock squares and triangles)
  // let colorPacks = [];

  // rectangles by color and size (sashings and borders)

  // --------------

  let colorPacks = [];

  // accumulate all rectangles
  let packsRectangles = rectanglesMerge().reduce(
    (acc, curr) => acc.concat(curr),
    []
  );

  // extract active colors from rectangles packs
  let packsRectanglesColors = [
    ...new Set(packsRectangles.map((pack) => pack.color)),
  ];

  let groupedPacksRectangles = [];
  // count elements that are equal in color, height, width
  packsRectanglesColors.forEach((color) => {
    let filteredPack = packsRectangles.filter((pack) => pack.color === color);

    const groupRectangles = (filteredPack, i = 0) => {
      if (filteredPack.length === 0) return;

      let notMatch = filteredPack.findIndex(
        (item) =>
          !(
            item.color === filteredPack[0].color &&
            item.height === filteredPack[0].height &&
            item.width === filteredPack[0].width
          )
      );

      let newGroup = {};
      newGroup.pieceType = "rectangle";
      newGroup.color = filteredPack[0].color;
      newGroup.height = filteredPack[0].height;
      newGroup.width = filteredPack[0].width;
      newGroup.pieces =
        notMatch === -1 && filteredPack.length === 1
          ? 1
          : notMatch === -1 && filteredPack.length > 1
          ? filteredPack.length
          : notMatch;
      groupedPacksRectangles.push(newGroup);

      if (notMatch <= 0 && filteredPack.length === 1) {
        filteredPack.splice(0, 1);
      } else if (notMatch <= 0 && filteredPack.length > 1) {
        filteredPack.splice(0, filteredPack.length);
      } else {
        filteredPack.splice(0, notMatch);
      }

      return groupRectangles(filteredPack, i + 1);
    };
    groupRectangles(filteredPack);
  });
  groupedPacksRectangles.forEach((pack) => colorPacks.push(pack));

  //--------

  // regular size squares by color
  fabricColors.forEach((color) => {
    let countedSqu = collectRegularSizeSquares()
      .reduce((acc, curr) => acc.concat(curr), [])
      .filter((squ) => squ === color)
      .reduce((acc) => acc + 1, 0);
    let colorPackSqu = {};
    colorPackSqu.color = color;
    colorPackSqu.pieceType = "square";
    colorPackSqu.height = (fabrSquareWidth + 2 * seamAllowance90deg).toFixed(2);
    colorPackSqu.width = (fabrSquareWidth + 2 * seamAllowance90deg).toFixed(2);
    colorPackSqu.pieces = countedSqu;
    if (countedSqu > 0) {
      colorPacks.push(colorPackSqu);
    }
  });

  // -------------

  // regular size triangles by color
  fabricColors.forEach((color) => {
    let countedHst = collectRegularSizeTriangles()
      .reduce((acc, curr) => acc.concat(curr), [])
      .filter((hst) => hst === color)
      .reduce((acc) => acc + 1, 0);
    let colorPackHst = {};
    colorPackHst.color = color;
    colorPackHst.pieceType = "hst";
    colorPackHst.height = (fabrSquareWidth + 2 * seamAllowance90deg).toFixed(2);
    colorPackHst.width = (
      fabrSquareWidth +
      seamAllowance90deg +
      seamAllowance45deg
    ).toFixed(2);
    colorPackHst.pieces = countedHst;
    if (countedHst > 0) {
      colorPacks.push(colorPackHst);
    }
  });

  // -----------

  // big block squares and triangles by color and size
  let allBigBlocks = collectBigBlockPieces();
  allBigBlocks.forEach((block) => {
    let color1PackBigSqu = {};
    color1PackBigSqu.color = block.color1;
    color1PackBigSqu.pieceType = "square";
    color1PackBigSqu.height = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color1PackBigSqu.width = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color1PackBigSqu.pieces = block.squaresColor1;
    if (block.squaresColor1 > 0) {
      colorPacks.push(color1PackBigSqu);
    }
    let color2PackBigSqu = {};
    color2PackBigSqu.color = block.color2;
    color2PackBigSqu.pieceType = "square";
    color2PackBigSqu.height = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color2PackBigSqu.width = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color2PackBigSqu.pieces = block.squaresColor2;
    if (block.squaresColor2 > 0) {
      colorPacks.push(color2PackBigSqu);
    }
    let color3PackBigSqu = {};
    color3PackBigSqu.color = block.color3;
    color3PackBigSqu.pieceType = "square";
    color3PackBigSqu.height = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color3PackBigSqu.width = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color3PackBigSqu.pieces = block.squaresColor3;
    if (block.squaresColor3 > 0) {
      colorPacks.push(color3PackBigSqu);
    }
    let color1PackBigHst = {};
    color1PackBigHst.color1 = block.color1;
    color1PackBigHst.pieceType = "hst";
    color1PackBigHst.height = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color1PackBigHst.width = (
      fabrSquareWidth * block.sizeFactor +
      seamAllowance90deg +
      seamAllowance45deg
    ).toFixed(2);
    color1PackBigHst.pieces = block.trianglesColor1;
    if (block.trianglesColor1 > 0) {
      colorPacks.push(color1PackBigHst);
    }
    let color2PackBigHst = {};
    color2PackBigHst.color2 = block.color2;
    color2PackBigHst.pieceType = "hst";
    color2PackBigHst.height = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color2PackBigHst.width = (
      fabrSquareWidth * block.sizeFactor +
      seamAllowance90deg +
      seamAllowance45deg
    ).toFixed(2);
    color2PackBigHst.pieces = block.trianglesColor2;
    if (block.trianglesColor2 > 0) {
      colorPacks.push(color2PackBigHst);
    }
    let color3PackBigHst = {};
    color3PackBigHst.color3 = block.color3;
    color3PackBigHst.pieceType = "hst";
    color3PackBigHst.height = (
      fabrSquareWidth * block.sizeFactor +
      2 * seamAllowance90deg
    ).toFixed(2);
    color3PackBigHst.width = (
      fabrSquareWidth * block.sizeFactor +
      seamAllowance90deg +
      seamAllowance45deg
    ).toFixed(2);
    color3PackBigHst.pieces = block.trianglesColor3;
    if (block.trianglesColor3 > 0) {
      colorPacks.push(color3PackBigHst);
    }
  });

  // ---------------

  // make sure all sizes are numbers, not strings
  colorPacks.forEach((pack) => {
    pack.height = parseFloat(pack.height);
    pack.width = parseFloat(pack.width);
  });

  // sort all items by color, height (desc), width (desc)
  colorPacks.sort((a, b) => {
    if (a.color > b.color) {
      return 1;
    } else if (a.color < b.color) {
      return -1;
    } else if (a.color === b.color && a.height < b.height) {
      return 1;
    } else if (a.color === b.color && a.height > b.height) {
      return -1;
    } else if (
      a.color === b.color &&
      a.height === b.height &&
      a.width < b.width
    ) {
      return 1;
    } else if (
      a.color === b.color &&
      a.height === b.height &&
      a.width > b.width
    ) {
      return 0;
    }
  });

  return colorPacks;
};

export default CollectPieces;
