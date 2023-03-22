import { useState } from "react";
import { scrollStyling } from "src/styles/mixins";
import styled from "styled-components";

interface TableProps {
  headers: string[];
  rows: any[]; //Has to be any to avoid the row map err
  id?: string;
  className?: string;
}

const Table = ({ headers, rows, id, className }: TableProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <div className={className}>
      <table id={id}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={id}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice((pageNumber - 1) * 10, pageNumber * 10).map((row) => (
            <tr key={id}>
              {row.map((cell) => (
                <td key={id}>{cell} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        listLength={rows.length}
        onClick={setPageNumber}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export const Pagination = ({ pageNumber, listLength, onClick }) => {
  let noOfPages = Math.ceil(listLength / 10);
  let pageNumbers = [];
  if (noOfPages < 10) {
    for (let i = 1; i <= noOfPages; i++) {
      if (i === pageNumber) {
        pageNumbers.push(
          <span
            style={{ backgroundColor: "grey", fontSize: "15px" }}
            onClick={() => onClick(i)}
          >
            {i}
          </span>
        );
      } else {
        pageNumbers.push(<span onClick={() => onClick(i)}>{i}</span>);
      }
    }
  } else {
    // Always print first page button
    if (pageNumber === 1) {
      pageNumbers.push(
        <span style={{ backgroundColor: "grey" }} onClick={() => onClick(1)}>
          1
        </span>
      );
    } else {
      pageNumbers.push(<span onClick={() => onClick(1)}>1</span>);
    }
    // Print "..." if pageNumber is > 3
    if (pageNumber > 3) {
      pageNumbers.push(<span>...</span>);
    }
    // special case where last page is selected...
    if (pageNumber === noOfPages) {
      pageNumbers.push(
        <span onClick={() => onClick(pageNumber - 2)}>{pageNumber - 2}</span>
      );
    }
    // Print previous number button if pageNumber > 3
    if (pageNumber > 2) {
      pageNumbers.push(
        <span onClick={() => onClick(pageNumber - 1)}>{pageNumber - 1}</span>
      );
    }
    //Print current page number button as long as it not the first or last page
    if (pageNumber !== 1 && pageNumber !== noOfPages) {
      pageNumbers.push(
        <span
          style={{ backgroundColor: "grey" }}
          onClick={() => onClick(pageNumber)}
        >
          {pageNumber}
        </span>
      );
    }
    //print next number button if pageNumber < lastPage - 3
    if (pageNumber < noOfPages - 1) {
      pageNumbers.push(
        <span onClick={() => onClick(pageNumber + 1)}>{pageNumber + 1}</span>
      );
    }
    // special case where first page is selected...
    if (pageNumber === 1) {
      pageNumbers.push(
        <span onClick={() => onClick(pageNumber + 2)}>{pageNumber + 2}</span>
      );
    }
    //print "..." if pageNumber is < lastPage -2
    if (pageNumber < noOfPages - 2) {
      pageNumbers.push(<span>...</span>);
    }
    //Always print last page button if there is more than 1 page
    if (noOfPages > 1) {
      if (pageNumber === noOfPages) {
        pageNumbers.push(
          <span
            style={{ backgroundColor: "grey" }}
            onClick={() => onClick(noOfPages)}
          >
            {noOfPages}
          </span>
        );
      } else {
        pageNumbers.push(
          <span onClick={() => onClick(noOfPages)}>{noOfPages}</span>
        );
      }
    }
  }
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {pageNumbers}
    </div>
  );
};

const StyledTable = styled(Table)`
  width: 100%;
  overflow-x: scroll;
  ${scrollStyling}
  > table {
    min-width: 100%;
    color: var(--contrast);

    th {
      min-height: 60px;
      text-align: left;
      font-size: 14px;
      white-space: nowrap;
      > svg {
        fill: currentColor;
        opacity: 0.5;
        height: 16px;
        width: auto;
      }
    }

    td {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
    }

    // Not last child because this will be the 'actions' column, modal needs overflow
    td:not(:last-child) {
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 600px;

      @media (max-width: ${(props) => props.theme.breakpoints.xxLarge}) {
        max-width: 400px;
      }
      @media (max-width: ${(props) => props.theme.breakpoints.xLarge}) {
        max-width: 250px;
      }
    }

    td,
    th {
      padding: 28px 10px;
      vertical-align: middle;

      &:first-child {
        padding-left: 20px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      &:last-child {
        padding-right: 20px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }

    tbody tr:hover {
      background: var(--table-row-background-hover);
    }
  }
`;
export default StyledTable;
