import { fetchRelatedTermsSearch } from "../../../utils/requests";
import style from "./AddTermAndRelated.module.css";

import { useEffect, useState } from "react";
import { TermType } from "types/types";

export default function RelatedTerms({
  formData,
  handleRelatedTerms,
  handleRemoveRelated,
}: {
  formData: TermType,
  handleRelatedTerms: (relatedTerm: { term: string; id: number; }, callback: () => any) => void,
  handleRemoveRelated: (relatedTermId: number) => void
}
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const relatedTerms = searchResults.data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetchRelatedTermsSearch(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <div className={style.relatedTerms}>
      <label htmlFor="">Related terms</label>
      <div className={style.searchDiv}>
        <input
          placeholder="Search terms"
          value={searchQuery}
          onChange={(e) => {
            handleSearchInputChange(e);
          }}
        />

        <div className={style.searchResults}>
          <ul className={style.searchResultsUl}>
            {relatedTerms &&
              relatedTerms.length > 0 &&
              relatedTerms.map((relatedTerm: any) => {
                return (
                  <li
                    key={relatedTerm.id}
                    onClick={() => {
                      handleRelatedTerms(
                        {
                          id: relatedTerm.id,
                          term: relatedTerm.term
                        },
                        clearSearchQuery
                      );
                    }}
                  >
                    <p>{`id: ${relatedTerm.id} - ${relatedTerm.term}`}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <ul className={style.relatedTermsList}>
        {formData.relatedTerms.map((relatedTerm) => {
          return (
            <li
              className={style.relatedTermList}
              key={relatedTerm.id}
              onClick={() => {
                handleRemoveRelated(relatedTerm.id);
              }}
            >
              {`${relatedTerm.term} - ID: ${relatedTerm.id} `}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
