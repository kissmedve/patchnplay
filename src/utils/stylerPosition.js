export function topOffset(
  stylerBottomDistance,
  distanceToTop,
  stylerHeight,
  stretch, // BigBlockStyler
  sashingStretch, // SashingRowStyler
  sashingCrossStretch, // SquareStyler, BigBlockStyler
  squareWidth
) {
  if (stylerBottomDistance) {
    if (
      // flip SashingRowStyler
      sashingStretch &&
      stylerBottomDistance < stylerHeight &&
      distanceToTop >= stylerHeight
    ) {
      return -stylerHeight - 30;
    } else if (
      // else SashingRowStyler sticks fully to bottom
      sashingStretch &&
      distanceToTop < stylerHeight
    ) {
      return 0;
    } else if (stylerBottomDistance <= -16) {
      return stylerBottomDistance;
    } else if (stylerBottomDistance > -16 && stylerBottomDistance < 0) {
      return -16;
    } else if (stylerBottomDistance >= 0) {
      return 0;
    }
  }
}

export function leftOffset(
  stylerRightDistance,
  stylerLeftDistance,
  stylerWidth,
  stretch, // BigBlockStyler
  sashingStretch, // SashingColStyler
  sashingCrossStretch, // SquareStyler, BigBlockStyler
  squareWidth
) {
  if (stylerRightDistance) {
    // flip BigBlockStyler
    if (
      stretch &&
      sashingCrossStretch &&
      squareWidth &&
      stylerRightDistance <= stylerWidth &&
      stylerLeftDistance > stylerWidth
    ) {
      let actualStretch =
        stretch > sashingCrossStretch ? stretch : sashingCrossStretch;
      return -stylerWidth + 18 - 32 - (actualStretch - 1) * squareWidth;
    }
    // flip SashingColStyler
    else if (
      sashingStretch &&
      squareWidth &&
      stylerRightDistance <= stylerWidth &&
      stylerLeftDistance > stylerWidth
    ) {
      return -stylerWidth + 10 - 40 - (sashingStretch - 1) * squareWidth;
    }
    // flip SquareStyler at sashingCross
    else if (
      sashingCrossStretch &&
      squareWidth &&
      stylerRightDistance <= stylerWidth &&
      stylerLeftDistance > stylerWidth
    ) {
      return -stylerWidth + 18 - 32 - (sashingCrossStretch - 1) * squareWidth;
    }
    // no flip
    else {
      return 0;
    }
  }
}

export function pointerVerticalPosition(
  stylerBottomDistance,
  stylerTopDistance,
  stylerHeight
) {
  // 32: offset from square top; 25: half squareWidth; 8: pointer half height;
  if (stylerBottomDistance && stylerTopDistance) {
    if (
      stylerBottomDistance < stylerHeight &&
      stylerTopDistance > stylerHeight
    ) {
      return stylerHeight - 18 - 7;
    }
    if (stylerTopDistance < stylerHeight) {
      return 7;
    }
  }
  if (stylerBottomDistance) {
    if (stylerBottomDistance <= -16) {
      return -stylerBottomDistance + 18 - 25 - 8;
    }
    if (stylerBottomDistance > -16 && stylerBottomDistance < 0) {
      // if stylerBottomDistance is padded to 16 (18: width glassy border):
      return 18;
    }
    if (stylerBottomDistance >= 0) {
      return 7;
    }
  }
}

export function pointerHorizontalPosition(stylerRightDistance, stylerWidth) {
  if (stylerRightDistance) {
    if (stylerRightDistance <= stylerWidth) {
      return stylerWidth - 21;
    } else {
      return 8;
    }
  }
}

export function pointerClass(
  stylerBottomDistance,
  stylerRightDistance,
  stylerTopDistance,
  stylerWidth,
  stylerHeight
) {
  // SashingRowStyler
  if (stylerBottomDistance && stylerTopDistance) {
    if (
      stylerBottomDistance <= stylerHeight &&
      stylerTopDistance > stylerHeight
    ) {
      return "bottom-left";
    }
    if (stylerTopDistance < stylerHeight) {
      return "top-left";
    }
  }
  // SquareStyler, BigBlockStyler
  else if (stylerBottomDistance) {
    if (stylerBottomDistance > 0 && stylerRightDistance > stylerWidth) {
      return "top-left";
    }
    if (stylerBottomDistance > 0 && stylerRightDistance <= stylerWidth) {
      return "top-right";
    }
    if (stylerBottomDistance <= 0 && stylerRightDistance > stylerWidth) {
      return "left";
    }
    if (stylerBottomDistance <= 0 && stylerRightDistance <= stylerWidth) {
      return "right";
    }
  }
  // SashingColStyler
  else if (stylerBottomDistance === null) {
    if (stylerRightDistance > stylerWidth) {
      return "top-left";
    }
    if (stylerRightDistance <= stylerWidth) {
      return "top-right";
    }
  }
}
