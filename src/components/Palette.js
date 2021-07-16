import React, { useState } from "react";
import Swatches from './Swatches';

const Palette = ({ paletteType }) => {

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
      type: 'bigBlock',
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
  ];

  const setNewColor = (newColor, newSwatchesGroup) => {
    setColorData({
      color: newColor,
      swatchesGroup: newSwatchesGroup
    })
  };

  const paletteFiltered = paletteData.filter(palette => palette.type === paletteType)[0];
  const paletteFilteredData = paletteFiltered ? paletteFiltered.data : null;

  return (
    <>
      <div className="color-swatches card-footer">

        <div className="h6">
          {paletteFilteredData && paletteFilteredData.length > 1 ? 'Pick Colours' : paletteFilteredData && paletteFilteredData.length === 1 ? 'Pick a Colour' : null}
        </div>

        {paletteFilteredData && paletteFilteredData.length > 0 ? paletteFilteredData.map((item, index) => (
          <Swatches swatchesTitle={item.swatchesTitle} swatchesGroup={item.swatchesGroup} setNewColor={setNewColor} key={index} />
        )) : null}
      </div>

    </>
  )
}

export default Palette;