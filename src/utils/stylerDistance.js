export function bottomDistance(
  id,
  stylerHeight1,
  stylerHeight2,
  stylerHeight3,
  squareWidth,
  paletteRows,
  blockRows,
  stretch,
  sashingHeights,
  borders,
  borderBaseWidth
) {
  // measurements height
  const windowHeight = window.innerHeight - 15; // bottom scrollbar!

  // distanceToTop
  // =====================
  // sum of top border heights
  const sumTopBorderHeights = borders
    .map((border) => border.widthTop * borderBaseWidth)
    .reduce((acc, curr) => acc + curr, 0);
  // sum of square rows above, times width respectively (sashing!)
  const currentRow = Number(id.split("-")[0]);
  const sumRowHeights = sashingHeights
    .slice(0, currentRow)
    .reduce((acc, curr) => acc + curr * squareWidth, 0);
  // sum incl. #main's top padding: 70px, top buttons row: 90px
  const distanceToTop = 70 + 90 + sumTopBorderHeights + sumRowHeights;

  const colourBarHeight = 25;
  // no palette rows on initial bigBlockStyler
  // let palettesHeight =
  //   blockRows !== null && stylerHeight1 !== null
  //     ? 0
  //     : paletteRows * colourBarHeight;
  let palettesHeight = paletteRows * colourBarHeight;

  const blockRowHeight = 37;
  let blockRowsHeight =
    blockRows !== null && blockRows > 0 ? (blockRows - 1) * blockRowHeight : 0;

  const stretchHeight = stretch !== null ? (stretch - 1) * squareWidth : 0;

  let stylerHeight =
    stylerHeight1 !== null
      ? stylerHeight1 + palettesHeight + blockRowsHeight
      : stylerHeight2 !== null
      ? stylerHeight2 + palettesHeight * 2 + blockRowsHeight
      : stylerHeight3 !== null
      ? stylerHeight3 + palettesHeight * 3 + blockRowsHeight
      : null;

  // stylerBottomDistance
  let bottomDistance =
    windowHeight - distanceToTop - stylerHeight - stretchHeight - 32;

  return bottomDistance;
}

export function rightDistance(
  id,
  stylerWidth,
  squareWidth,
  sashingWidths,
  stretch,
  borders,
  borderBaseWidth
) {
  // measurements width
  const windowWidth = window.innerWidth - 15; // right scrollbar!

  const stretchWidth = stretch !== null ? (stretch - 1) * squareWidth : 0;

  // distanceToLeft
  // ======================
  // sum of left border widths
  const sumLeftBorderWidths = borders
    .map((border) => border.widthLeft * borderBaseWidth)
    .reduce((acc, curr) => acc + curr, 0);
  // sum of square cols left, times width respectively (sashing!)
  const currentCol = Number(id.split("-")[1]);
  const sumColWidths = sashingWidths
    .slice(0, currentCol)
    .reduce((acc, curr) => acc + curr * squareWidth, 0);

  // width sum all columns
  const sumAllColWidths = sashingWidths.reduce(
    (acc, curr) => acc + curr * squareWidth,
    0
  );
  // sum of right border widths
  const sumRightBorderWidths = borders
    .map((border) => border.widthRight * borderBaseWidth)
    .reduce((acc, curr) => acc + curr, 0);

  // sum incl. #main's left padding: 20px, left buttons row: 90px
  const gridContainerWidth =
    90 + sumLeftBorderWidths + sumAllColWidths + sumRightBorderWidths;
  let rightGridRemainder =
    gridContainerWidth - (20 + 90 + sumLeftBorderWidths + sumColWidths + 32);

  let distanceToLeft = () => {
    if (windowWidth <= gridContainerWidth) {
      return 20 + 90 + sumLeftBorderWidths + sumColWidths;
    }
    if (windowWidth > gridContainerWidth && rightGridRemainder < stylerWidth) {
      return (
        20 +
        90 +
        sumLeftBorderWidths +
        sumColWidths +
        (windowWidth - gridContainerWidth) / 2
      );
    }
    if (windowWidth > gridContainerWidth && rightGridRemainder > stylerWidth) {
      return 20 + 90 + sumLeftBorderWidths + sumColWidths;
    }
  };
  // stylerRightDistance
  let rightDistance = windowWidth - distanceToLeft() - 32 - stretchWidth;

  return rightDistance;
}
