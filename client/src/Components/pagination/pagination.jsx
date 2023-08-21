import React from "react";
import * as styles from "./pagStiles"


export default function Paginado({ eventsPerPage,events, paginado, page }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(events.length / eventsPerPage);

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (page <= 4) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...", totalPages);
    } else if (page >= totalPages - 3) {
      pageNumbers.push(1, "...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
  }

  return (
    <nav className={styles.container}>
      {page > 1 && (
        <div>
          <button className={styles.backbuton} onClick={() => paginado(page - 1)}>
            {"<"} 
          </button>
        </div>
      )}
      {pageNumbers.map((number, index) => (
        <div key={index}>
          <button
            className={`${styles.button} ${number === page ? styles.colorbutton : styles.hovbutton}`}
            onClick={() => (number !== "..." ? paginado(number) : null)}
            disabled={number === page}
          >
            {number === "..." ? "..." : number}
          </button>
        </div>
      ))}
      {page < totalPages && (
        <div>
          <button className={styles.nexbutton} onClick={() => paginado(page + 1)}>
             {">"}
          </button>
        </div>
      )}
    </nav>
  );
  
  
}