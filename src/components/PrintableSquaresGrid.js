import React, { useContext, useState, useEffect } from "react";
import { SquaresContext } from "./SquaresContext";
import elementBlocks from "../data/elementBlocks";
import { StylersContext } from "./StylersContext";

const PrintableSquaresGrid = () => {

  // global states
  const { squares, insertedBigBlocks, borders, squareWidth, sashingWidths, sashingHeights, borderBaseWidth } = useContext(SquaresContext);
  const { bigBlockStylerIsOpen } = useContext(StylersContext);

  // local states
  const [elemBlocks, setElemBlocks] = useState([]);

  useEffect(() => {
    if (insertedBigBlocks.length > 0) {
      insertedBigBlocks.map(inserted => {
        let elBlock = elementBlocks.find(block => inserted.elementBlocksId === block.id);
        if (!elemBlocks.find(block => block.id === elBlock.id)) {
          setElemBlocks([
            ...elemBlocks,
            {
              id: elBlock.id,
              rowCol: elBlock.rowCol,
              paths: elBlock.paths,
            }])
        }
      })
    }
  }, [bigBlockStylerIsOpen]);

  // offset of squares grid from outmost border
  const left = borders.map(border => border.widthLeft).reduce((acc, val) => acc + val, 0) * borderBaseWidth;
  const top = borders.map(border => border.widthTop).reduce((acc, val) => acc + val, 0) * borderBaseWidth;

  // cumulated width and height of squares grid
  const squGridWith = sashingWidths.reduce((acc, val) => acc + val, 0) * squareWidth;
  const squGridHeight = sashingHeights.reduce((acc, val) => acc + val, 0) * squareWidth;

  // cumulated widths and heights of border "boxes"
  let borderWidths = borders.map(border => (border.widthLeft + border.widthRight) * borderBaseWidth);
  borderWidths.push(squGridWith);
  const cumBWidths = borders.map((border, i) => {
    return borderWidths.slice(i, borderWidths.length).reduce((acc, val) => acc + val, 0)
  });
  let borderHeights = borders.map(border => (border.widthTop + border.widthBottom) * borderBaseWidth);
  borderHeights.push(squGridHeight);
  const cumBHeights = borders.map((border, i) => {
    return borderHeights.slice(i, borderHeights.length).reduce((acc, val) => acc + val, 0);
  });

  // cumulated width and height border offsets
  const borderLeftOffsets = borders.map(border => border.widthLeft);
  const cumBLeftOffsets = borderLeftOffsets.map((offset, i) => {
    return borderLeftOffsets.slice(0, i).reduce((acc, val) => acc + val, 0) * borderBaseWidth;
  });
  const borderTopOffsets = borders.map(border => border.widthTop);
  const cumBTopOffsets = borderTopOffsets.map((offset, i) => {
    return borderTopOffsets.slice(0, i).reduce((acc, val) => acc + val, 0) * borderBaseWidth;
  });

  // paths for squares and HSTs
  const pathDataSquare = (data, sizeFactor = 1, offsetLeft = 0, offsetTop = 0) => {
    let pathData = [
      'M', data[0][0] * sizeFactor + offsetLeft, data[0][1] * sizeFactor + offsetTop,
      'L', data[1][0] * sizeFactor + offsetLeft, data[1][1] * sizeFactor + offsetTop,
      'L', data[2][0] * sizeFactor + offsetLeft, data[2][1] * sizeFactor + offsetTop,
      'L', data[3][0] * sizeFactor + offsetLeft, data[3][1] * sizeFactor + offsetTop,
      'Z',
    ]
    return pathData.join(' ');
  }

  const pathDataTriangle = (data, sizeFactor = 1, offsetLeft = 0, offsetTop = 0) => {
    let pathData = [
      'M', data[0][0] * sizeFactor + offsetLeft, data[0][1] * sizeFactor + offsetTop,
      'L', data[1][0] * sizeFactor + offsetLeft, data[1][1] * sizeFactor + offsetTop,
      'L', data[2][0] * sizeFactor + offsetLeft, data[2][1] * sizeFactor + offsetTop,
      'Z',
    ]
    return pathData.join(' ');
  }

  const writeSquare = (i, k, left, top, sashWidth, sashHeight, fillColor) => {
    let width = squareWidth * sashWidth;
    let height = squareWidth * sashHeight;
    let vertices = [
      [(k * width) + left, (i * height) + top],
      [((k + 1) * width) + left, (i * height) + top],
      [((k + 1) * width) + left, ((i + 1) * height) + top],
      [(k * width) + left, ((i + 1) * height) + top]
    ];

    let pathDataSqu = pathDataSquare(vertices);

    return <path d={pathDataSqu} fill={fillColor} />
  }

  const writeHSTUp = (i, k, left, top, sashWidth, sashHeight, fillColorLeft, fillColorRight) => {
    let width = squareWidth * sashWidth;
    let height = squareWidth * sashHeight;
    let verticesLeft = [
      [(k * width) + left, (i * height) + top],
      [((k + 1) * width) + left, (i * height) + top],
      [(k * width) + left, ((i + 1) * height) + top]
    ];
    let verticesRight = [
      [((k + 1) * width) + left, (i * height) + top],
      [((k + 1) * width) + left, ((i + 1) * height) + top],
      [(k * width) + left, ((i + 1) * height) + top]
    ];

    let pathDataLeft = pathDataTriangle(verticesLeft);
    let pathDataRight = pathDataTriangle(verticesRight);

    return (
      <>
        <path d={pathDataLeft} fill={fillColorLeft} />
        <path d={pathDataRight} fill={fillColorRight} />
      </>
    )
  }

  const writeHSTDown = (i, k, left, top, sashWidth, sashHeight, fillColorLeft, fillColorRight) => {
    let width = squareWidth * sashWidth;
    let height = squareWidth * sashHeight;
    let verticesLeft = [
      [(k * width) + left, (i * height) + top],
      [((k + 1) * width) + left, ((i + 1) * height) + top],
      [(k * width) + left, ((i + 1) * height) + top]
    ];
    let verticesRight = [
      [(k * width) + left, (i * height) + top],
      [((k + 1) * width) + left, (i * height) + top],
      [((k + 1) * width) + left, ((i + 1) * height) + top]
    ];

    let pathDataLeft = pathDataTriangle(verticesLeft);
    let pathDataRight = pathDataTriangle(verticesRight);

    return (
      <>
        <path d={pathDataLeft} fill={fillColorLeft} />
        <path d={pathDataRight} fill={fillColorRight} />
      </>
    )
  }

  // draw squares grid
  const squaresGrid = () => {
    let grid = squares.map(squs => {
      return squs.map(squ => {
        if (squ.squareType === 'rect') {
          return writeSquare(squ.row, squ.col, left, top, squ.sashingWidth, squ.sashingHeight, squ.fillSquare);
        }
        if (squ.squareType === 'hstUp') {
          return writeHSTUp(squ.row, squ.col, left, top, squ.sashingWidth, squ.sashingHeight, squ.fillHstLup, squ.fillHstRUp);
        }
        if (squ.squareType === 'hstDown') {
          return writeHSTDown(squ.row, squ.col, left, top, squ.sashingWidth, squ.sashingHeight, squ.fillHstLDown, squ.fillHstRDown);
        }
      })
    });
    return grid;
  }

  // draw borders 
  const bordersBox = () => {
    let pathData = borders.map((border, i) => {
      let path = [
        'M', cumBLeftOffsets[i], cumBTopOffsets[i],
        'L', cumBLeftOffsets[i] + cumBWidths[i], cumBTopOffsets[i],
        'L', cumBLeftOffsets[i] + cumBWidths[i], cumBTopOffsets[i] + cumBHeights[i],
        'L', cumBLeftOffsets[i], cumBTopOffsets[i] + cumBHeights[i],
        'Z',
      ].join(' ');
      let bg = border.background;
      return <path d={path} fill={bg} ></path>
    })
    return pathData;
  }

  // draw inserted BigBlocks
  const bigBlocks = () => {

    return insertedBigBlocks.map(insBlock => {
      let anchor = insBlock.anchorSquare.split('-');
      let widthOffset = (sashingWidths.slice(0, anchor[1]).reduce((acc, val) => acc + val, 0) * squareWidth) + left;
      let heightOffset = (sashingHeights.slice(0, anchor[0]).reduce((acc, val) => acc + val, 0) * squareWidth) + top;
      const resizing = insBlock.stretchSquares / insBlock.rowCol;

      let eleBlock = elemBlocks.find(block => block.id === insBlock.elementBlocksId);

      if (eleBlock) {
        return eleBlock.paths.map(path => {

          let fillColor = path.fillColor === 'color1' ? insBlock.color1 :
            path.fillColor === 'color2' ? insBlock.color2 :
              insBlock.color3;

          if (path.vertices.length === 4) {
            let pathDataSqu = pathDataSquare(path.vertices, resizing, widthOffset, heightOffset);
            return <path d={pathDataSqu} fill={fillColor}></path>
          }
          if (path.vertices.length === 3) {
            let pathDataTr = pathDataTriangle(path.vertices, resizing, widthOffset, heightOffset);
            return <path d={pathDataTr} fill={fillColor}></path>
          }
        })
      }
    })
  }

  return (
    <>
      <svg viewBox={`0 0 ${cumBWidths[0]} ${cumBHeights[0]}`} /* width="100%" */ >
        {bordersBox()}
        {squaresGrid()}
        {bigBlocks()}
      </svg>

    </>
  )
}

export default PrintableSquaresGrid;
