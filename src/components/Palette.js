import React, { useState, useContext } from "react";
import { StylersContext } from "./StylersContext";
import Swatches from './Swatches';

const Palette = ({ paletteType, squareId, rowColId, borderPos }) => {

  // global states
  const { colorSquare } = useContext(StylersContext);

  // local states
  const [colorData, setColorData] = useState({});

  const paletteData = [
    {
      type: 'rect',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Square',
        }
      ],
    },
    {
      type: 'hstDown',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Left Triangle',
        },
        {
          swatchesGroup: '2',
          swatchesTitle: 'Right Triangle',
        }
      ]
    },
    {
      type: 'hstUp',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Left Triangle',
        },
        {
          swatchesGroup: '2',
          swatchesTitle: 'Right Triangle',
        }
      ],
    },
    {
      type: 'bigBlockCol2',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Colour 1',
        },
        {
          swatchesGroup: '2',
          swatchesTitle: 'Colour 2',
        },
      ],
    },
    {
      type: 'bigBlockCol3',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Colour 1',
        },
        {
          swatchesGroup: '2',
          swatchesTitle: 'Colour 2',
        },
        {
          swatchesGroup: '3',
          swatchesTitle: 'Colour 3',
        }
      ],
    },
    {
      type: 'sashColumn',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Sashing Column',
        }
      ],
    },
    {
      type: 'sashRow',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Sashing Row',
        }
      ],
    },
    {
      type: 'sashing',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Sashing Cross',
        }
      ],
    },
    {
      type: 'border',
      data: [
        {
          swatchesGroup: '1',
          swatchesTitle: 'Border',
        }
      ],
    },
  ];

  const paletteFiltered = paletteData.filter(palette => palette.type === paletteType)[0];
  const paletteFilteredData = paletteFiltered ? paletteFiltered.data : null;

  return (
    <>
      <div className="color-swatches">

        <div className="h6">
          {paletteFilteredData && paletteFilteredData.length > 1 ? 'Colours' : paletteFilteredData && paletteFilteredData.length === 1 ? 'Colour' : null}
        </div>

        {paletteFilteredData && paletteFilteredData.length > 0 ? paletteFilteredData.map((item, index) => (
          <Swatches squareId={squareId} rowColId={rowColId} paletteType={paletteType} swatchesTitle={item.swatchesTitle} swatchesGroup={item.swatchesGroup} borderPos={borderPos} key={index} />
        )) : null}
      </div>

    </>
  )
}

export default Palette;