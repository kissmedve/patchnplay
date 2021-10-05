import React from "react";

const SVGPath = ({ vertices, fillColor, color1, color2, color3 }) => {

  let newFillColor = '';
  switch (fillColor) {
    case 'color1':
      newFillColor = color1;
      break;
    case 'color2':
      newFillColor = color2;
      break;
    case 'color3':
      newFillColor = color3;
      break;
    default:
      newFillColor = '#ddd';
  };

  // square path as standard
  let pathData = [
    'M', vertices[0][0], vertices[0][1],
    'L', vertices[1][0], vertices[1][1],
    'L', vertices[2][0], vertices[2][1],
    'L', vertices[3][0], vertices[3][1],
  ];
  // 1 less point, if path is triangle
  if (vertices.length === 3) {
    pathData = [
      'L', vertices[0][0], vertices[0][1],
      'L', vertices[1][0], vertices[1][1],
      'L', vertices[2][0], vertices[2][1],
    ];
  }
  // close shape
  pathData.push('Z');

  let pathDataJoined = pathData.join(' ');

  return (
    <path className={fillColor} d={pathDataJoined} fill={newFillColor} stroke="transparent" />
  )
}

export default SVGPath;