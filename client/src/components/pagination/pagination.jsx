import React from "react";
import s from './paginado.module.css';

export default function Paginado({ dogsPerPage, dogs, paginado, page }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(dogs.length / dogsPerPage);

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
    <nav className={s.nav}>
      <div className={s.number}>
        {page > 1 && (
          <div>
            <button className={s.btnNP} onClick={() => paginado(page - 1)}>
              {"<<"} Anterior
            </button>
          </div>
        )}
        {pageNumbers.map((number, index) => (
          <div key={index}>
            <button
              className={`${s.btn} ${number === page ? s.currentPage : ""} ${number === "..." ? s.dotsButton : ""}`}
              onClick={() => (number !== "..." ? paginado(number) : null)}
              disabled={number === page}
            >
              {number === "..." ? "..." : number}
            </button>
          </div>
        ))}
        {page < totalPages && (
          <div>
            <button className={s.btnNP} onClick={() => paginado(page + 1)}>
              Siguiente {">>"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}