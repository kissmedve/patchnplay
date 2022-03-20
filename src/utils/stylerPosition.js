export function topOffset(stylerBottomDistance) {
  if (stylerBottomDistance) {
    if (stylerBottomDistance <= -16) {
      return stylerBottomDistance;
    }
    if (stylerBottomDistance > -16 && stylerBottomDistance < 0) {
      return -16;
    }
    if (stylerBottomDistance >= 0) {
      return 0;
    }
  }
}

export function leftOffset(
  stylerRightDistance,
  stylerWidth,
  stretch,
  squareWidth
) {
  if (stylerRightDistance) {
    if (stretch && squareWidth && stylerRightDistance <= stylerWidth) {
      return -stylerWidth + 18 - 32 - (stretch - 1) * squareWidth;
    } else if (stylerRightDistance <= stylerWidth) {
      return -stylerWidth + 18 - 32;
    } else {
      return 0;
    }
  }
}

export function pointerVerticalPosition(stylerBottomDistance) {
  // 32: offset from square top; 25: half squareWidth; 8: pointer half height;
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
    if (stylerRightDistance < stylerWidth) {
      return stylerWidth - 21;
    } else {
      return 8;
    }
  }
}

export function pointerClass(
  stylerBottomDistance,
  stylerRightDistance,
  stylerWidth
) {
  if (stylerBottomDistance) {
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
}
