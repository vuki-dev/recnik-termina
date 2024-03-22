import style from "./TermsTable.module.css";
import Excerpt from "./Helpers/Excerpt";
import { useCustomDispatch, useCustomSelector } from "../../store/hooks";

import { useLocation, useNavigate } from "react-router-dom";
import { sortColumnAction } from "../../store/filterSlice";
import Loader from "./Helpers/Loader";
import AddTerm from "./CRUD/AddTerm";
import DeleteTerm from "./CRUD/DeleteTerm";

export default function TermsTable() {
  const terms = useCustomSelector((state) => state.terms.data.data);
  const navigate = useNavigate();
  const dispatch = useCustomDispatch();
  const location = useLocation();
  const loading = useCustomSelector((state) => state.terms.loading);

  function handleColumn(e: React.MouseEvent<HTMLTableCellElement>) {
    const target = e.target as HTMLTableCellElement
    dispatch(
      sortColumnAction(
        {
          column: target.id,
        },
        location,
        navigate
      )
    );
  }

  return (
    <>
      <div className={style.tableWrapper}>
        <table className={loading ? style.loadingTable : undefined}>
          {loading ? (
            <tbody>
              <tr>
                <td>
                  <Loader />
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              <thead>
                <tr>
                  <td>ID</td>
                  <td
                    id="term"
                    onClick={(e) => {
                      handleColumn(e);
                    }}
                  >
                    Term
                  </td>
                  <td>Slug</td>
                  <td
                    id="definition"
                    onClick={(e) => {
                      handleColumn(e);
                    }}
                  >
                    Definition
                  </td>
                  <td>Edit/Delete</td>
                </tr>
              </thead>
              <tbody>
                {terms &&
                  terms.map((term: any, i: number) => {
                    return (
                      <tr key={term.id}>
                        <td>{term.id}</td>
                        <td>{term.term}</td>
                        <td>{term.slug}</td>
                        <td>
                          {<Excerpt text={term.definition} maxLength={200} />}
                        </td>
                        <td className={`${style["edit-delete-buttons"]}`}>
                          <AddTerm identifier={"EDIT"} termForEdit={{term: term.term, slug: term.slug, definition: term.definition}} />
                          <DeleteTerm termData={{id: term.slug, term: term.term}} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </>
          )}
        </table>
      </div>
      {terms && terms.length === 0 && (
        <p className={style.noResults}>No results.</p>
      )}
    </>
  );
}
