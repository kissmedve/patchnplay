export default function checkColors(squares, insertedBigBlocks, borders) {
  const allColors = [];

  squares.forEach((squ) => {
    // squares or sashing
    if (squ.squareType === "rect" && squ.covered === false) {
      allColors.push(squ.fillSquare);
    }
    // HSTs
    else if (squ.squareType === "hstUp") {
      allColors.push(squ.fillHstLup);
      allColors.push(squ.fillHstRup);
    }
    // HSTs
    else if (squ.squareType === "hstDown") {
      allColors.push(squ.fillHstLdown);
      allColors.push(squ.fillHstRdown);
    }
  });
  // BigBlocks
  insertedBigBlocks.forEach((block) => {
    allColors.push(block.color1);
    allColors.push(block.color2);

    if (block.colours === 3) {
      allColors.push(block.color3);
    }
  });
  // borders
  borders.forEach((border) => allColors.push(border.background));

  const distinctColorsInUse = [...new Set(allColors)];

  return distinctColorsInUse;
}
