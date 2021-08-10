import React, { useState, useContext, useEffect } from "react";
import elementBlocks from "../data/elementBlocks";
import { BigBlocksContext } from "./BigBlocksContext";

const BigBlockGallery = () => {

  // global states
  const { selectedBigBlocks, addBigBlock, deleteBigBlock } = useContext(BigBlocksContext);

  // local states
  const [filters, setFilters] = useState({
    rowCol: '',
    colours: '',
    elements: '',
  });

  const filtered1 = filters.rowCol !== '' ? elementBlocks.filter(el => el.rowCol === filters.rowCol) : elementBlocks;
  const filtered2 = filters.colours !== '' ? filtered1.filter(el => el.colours === filters.colours) : filtered1;
  const filtered3 = filters.elements !== '' ? filtered2.filter(el => el.elements === filters.elements) : filtered2;

  const bigBlocksList =
    filtered3
      .map(el =>
        <div className="premade" key={el.id} onClick={() => addBigBlock(el.id)} >
          <img src={`svgs/${el.file}`} alt={`${el.name}`} />
        </div>)

  const bigBlocksSelection =
    elementBlocks.filter(block => selectedBigBlocks.includes(block.id)).map(block => <div className="premade" key={block.id} onClick={() => deleteBigBlock(block.id)} >
      <img src={`svgs/${block.file}`} alt={`${block.name}`} />
    </div>)

  const selectedBorder = bigBlocksSelection.length === 0 ? 'dashed 1px #333' : 'solid 1px transparent';
  const selectedMargin = bigBlocksSelection.length === 0 ? '15px 0 25px' : '0';

  return (
    <>
      <div className="selected gallery">
        <div className="h6">Palette</div>
        <div className="premades">
          <div className="selected-blocks" style={{ minHeight: "50px", minWidth: "50px", border: selectedBorder, margin: selectedMargin }}>
            {bigBlocksSelection}
          </div>
        </div>
      </div>

      <div className="gallery">
        <div className="h6">Gallery</div>

        <div className="filters">

          <div className="columns">

            <div className="form-group column col-3">
              <div className="form-select-title">Patches</div>
              <select className="form-select" onChange={(event) => setFilters({ ...filters, rowCol: event.target.value })}>
                <option value="">All</option>
                <option value="2">2 x 2</option>
                <option value="3">3 x 3</option>
                <option value="4">4 x 4</option>
                <option value="5">5 x 5</option>
              </select>
            </div>

            <div className="form-group column col-3">
              <div className="form-select-title">Colours</div>
              <select className="form-select" onChange={(event) => setFilters({ ...filters, colours: event.target.value })}>
                <option value="">All</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="form-group column col-3">
              <div className="form-select-title">Elements</div>
              <select className="form-select" onChange={(event) => setFilters({ ...filters, elements: event.target.value })} >
                <option value="">All</option>
                <option value="rect">Full Squares</option>
                <option value="hst">HSTs</option>
                <option value="mixed">Mixed</option>
                <option value="special">Specials</option>
              </select>
            </div>

            <div className="form-group column col-3">
              <div className="form-select-title">Pattern</div>
              <select className="form-select" onChange={(event) => setFilters({ ...filters, pattern: event.target.value })} >
                <option value="">All</option>
                <option value="diagonal">Diagonal</option>
                <option value="cross">Cross</option>
                <option value="centered">Centered</option>
                <option value="stripes">Stripes</option>
              </select>
            </div>

          </div>{/* columns */}
        </div>{/* filters */}
        <div className="big-blocks">
          {bigBlocksList}
        </div>
      </div>
    </>
  )
}

export default BigBlockGallery;