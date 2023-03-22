import { useState } from "react";

interface TableProps {
  headers: string[];
  rows: [];
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
              {[row].map((cell) => (
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
        width: "80%",
        justifyContent: "center",
        backgroundColor: "white",
        margin: "auto",
      }}
    >
      {pageNumbers}
    </div>
  );
};

export default Table;
