import React, { useState, useContext } from "react";
import elementBlocks from "../data/elementBlocks";
import { BigBlocksContext } from "./BigBlocksContext";

const BigBlockGallery = () => {
  // global states
  const { selectedBigBlocks, addBigBlock, deleteBigBlock } =
    useContext(BigBlocksContext);

  // local states
  const [filters, setFilters] = useState({
    rowCol: "",
    colours: "",
    elements: "",
  });
  const [page, setPage] = useState(1);

  // filters
  const filtered1 =
    filters.rowCol !== ""
      ? elementBlocks.filter((el) => el.rowCol === Number(filters.rowCol))
      : elementBlocks;
  const filtered2 =
    filters.colours !== ""
      ? filtered1.filter((el) => el.colours === Number(filters.colours))
      : filtered1;
  const filtered3 =
    filters.elements !== ""
      ? filtered2.filter((el) => {
          let elElements =
            el.elements.includes("rect") && el.elements.includes("hst")
              ? "mixed"
              : el.elements.includes("special")
              ? "special"
              : el.elements.includes("rect")
              ? "rect"
              : el.elements.includes("hst")
              ? "hst"
              : "";
          console.log("el.elements", el.elements, "elElements", elElements);
          return elElements === filters.elements;
        })
      : filtered2;

  const blocksPerView = 27;
  let currentPageList = filtered3.slice(
    blocksPerView * (page - 1),
    blocksPerView * page
  );

  // gallery blocks
  const bigBlocksList = currentPageList.map((el) => (
    <div className="premade" key={el.id} onClick={() => addBigBlock(el.id)}>
      <img src={`svgs/${el.file}.svg`} alt={`${el.name}`} />
    </div>
  ));

  // pagination
  let pagesNum = Math.ceil(filtered3.length / blocksPerView);
  console.log("filtered3.length", filtered3.length);
  console.log("pagesNum", pagesNum);

  const pageLinks = () => {
    let pageNums = [];
    for (let i = 1; i < pagesNum + 1; i++) {
      pageNums.push(
        <li>
          <button onClick={() => setPage(i)}>{i}</button>
        </li>
      );
    }
    return pageNums;
  };

  // selected blocks
  const bigBlocksSelection = elementBlocks
    .filter((block) => selectedBigBlocks.includes(block.id))
    .map((block) => (
      <div
        className="premade"
        key={block.id}
        onClick={() => deleteBigBlock(block.id)}
      >
        <img src={`svgs/${block.file}.svg`} alt={`${block.name}`} />
      </div>
    ));

  const selectedBorder =
    bigBlocksSelection.length === 0
      ? "dashed 1px #333"
      : "solid 1px transparent";
  const selectedMargin = bigBlocksSelection.length === 0 ? "15px 0 25px" : "0";

  return (
    <>
      <div className="selected gallery">
        <div className="h6">Palette</div>
        <div className="premades">
          <div
            className="selected-blocks"
            style={{
              minHeight: "50px",
              minWidth: "50px",
              border: selectedBorder,
              margin: selectedMargin,
            }}
          >
            {bigBlocksSelection}
          </div>
        </div>
      </div>

      <div className="gallery">
        <div className="h6">Gallery</div>

        <div className="filters">
          <div className="columns">
            <div className="form-group column col-4">
              <div className="form-select-title">Patches</div>
              <select
                className="form-select"
                onChange={(event) =>
                  setFilters({ ...filters, rowCol: event.target.value })
                }
              >
                <option value="">All</option>
                <option value="2">2 x 2</option>
                <option value="3">3 x 3</option>
                <option value="4">4 x 4</option>
                <option value="5">5 x 5</option>
              </select>
            </div>

            <div className="form-group column col-4">
              <div className="form-select-title">Colours</div>
              <select
                className="form-select"
                onChange={(event) =>
                  setFilters({ ...filters, colours: event.target.value })
                }
              >
                <option value="">All</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="form-group column col-4">
              <div className="form-select-title">Elements</div>
              <select
                className="form-select"
                onChange={(event) =>
                  setFilters({ ...filters, elements: event.target.value })
                }
              >
                <option value="">All</option>
                <option value="rect">Full Squares</option>
                <option value="hst">HSTs</option>
                <option value="mixed">Mixed</option>
                <option value="special">Specials</option>
              </select>
            </div>
          </div>
          {/* columns */}
        </div>
        {/* filters */}
        <div className="big-blocks">{bigBlocksList}</div>
      </div>

      <ul className="pagination">
        <li>
          <button onClick={() => setPage(1)}>&lt;&lt;</button>
        </li>
        <li>
          <button onClick={() => setPage(page - 1)}>&lt;</button>
        </li>
        {pageLinks()}
        <li>
          <button onClick={() => setPage(page + 1)}>&gt;</button>
        </li>
        <li>
          <button onClick={() => setPage(pagesNum)}>&gt;&gt;</button>
        </li>
      </ul>
    </>
  );
};

export default BigBlockGallery;
