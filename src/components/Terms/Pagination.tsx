import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./TermsLayout.module.css";
import { useCustomSelector } from "../../store/hooks";

export default function Pagination() {
  const lastPage = useCustomSelector((state) => state.terms.data["last_page"]);
  const currentPage = useCustomSelector((state) => state.terms.data["current_page"]);
  const paginationLinks = useCustomSelector((state) => state.terms.data.links);

  const location = useLocation();
  const navigate = useNavigate();

  function handlePages(identifier: string) {
    //for handling previous/next
    const newSearchParams = new URLSearchParams(location.search);

    if (identifier === "prev") {
      if (location.search.includes("page")) {
        newSearchParams.set("page", (currentPage-1).toString());
      } else {
        newSearchParams.append("page", (currentPage-1).toString());
      }
    } else if (identifier === "next") {
        if (location.search.includes("page")) {
          newSearchParams.set("page", (currentPage+1).toString());
        } else {
          newSearchParams.append("page", (currentPage+1).toString());
        }
      }

    navigate("?" + newSearchParams.toString());
  }

  function handlePage(selectedPage: number) {
    const newSearchParams = new URLSearchParams(location.search);

    if (location.search.includes("page")) {
      newSearchParams.set("page", selectedPage.toString());
    } else {
      newSearchParams.append("page", selectedPage.toString());
    }

    navigate("?" + newSearchParams.toString());
  }

  return (
    <div className={style.pagination}>
      <ul>
        <button className="button-6" onClick={() => handlePages("prev")} disabled={currentPage === 1} >
          Previous
        </button>

        {paginationLinks &&
          paginationLinks.map((link, i) => {
            if (i >= 1 && i < paginationLinks.length - 1) {
              return (
                <li
                  className={`${style.paginationLi} ${
                    link.active ? style.activePage : undefined
                  }`}
                  onClick={() => {
                    handlePage(link.label);
                  }}
                  key={i}
                >
                  {link.label}
                </li>
              );
            }
          })}

        <button className="button-6" onClick={() => handlePages("next")} disabled={currentPage === lastPage}>
          Next
        </button>
      </ul>
    </div>
  );
}
