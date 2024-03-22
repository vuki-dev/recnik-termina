import { useLocation, useNavigate } from "react-router-dom";
import style from "./TermsMenu.module.css";
import Select from "./Select";

import { charOPTIONS, orderOPTIONS } from "../../utils/options";
import { filterActions, sortDirectionAction } from "../../store/filterSlice";
import { useEffect, useState } from "react";
import { handleFilterQuery, handleSearchQuery, setPageParam } from "../../utils/filtering";
import { useCustomDispatch, useCustomSelector } from "../../store/hooks";

export default function TermsMenu() {
  const { filterParams, searchParams, sortDirection } = useCustomSelector(
    (state) => state.filter
  );

  const [defValues, setDefValues] = useState({
    search: "",
    filter: "",
    order: "",
  });

  const dispatch = useCustomDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const newSearchParams: any = new URLSearchParams(location.search);

    let sort = JSON.parse(newSearchParams.get("sort"));
    let filter = newSearchParams.get("first_letter");
    const search = newSearchParams.get("search");

    if (!sort) {
      sort = {
        direction: "",
      };
    }

    if(!filter){
      filter = ""
    }

    function handleDefValues() {
      setDefValues({
        search,
        order: sort.direction,
        filter: filter
      });
    }

    handleDefValues();
  }, [location.search]);

  function collectSearchQueries(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filterActions.setSearchParams(e.target.value));
  }

  function collectFilterQueries(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(filterActions.setFilterParams(e.target.value));
    setDefValues(prevState =>{
      return {
        ...prevState,
        filter: e.target.value
      }
    })
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleFiltering();
    }
  }

  function handleFiltering() {
    navigate(location.pathname, { replace: true });

    let newSearchParams = new URLSearchParams(location.search);

    newSearchParams = setPageParam(location, newSearchParams);
    newSearchParams = handleSearchQuery(
      location,
      searchParams,
      newSearchParams
    );
    newSearchParams = handleFilterQuery(
      location,
      filterParams,
      newSearchParams
    );

    newSearchParams.toString();

    // Update the URL
    navigate(`?${newSearchParams}`);
  }

  function handleDirection(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(sortDirectionAction(e.target.value, location, navigate));
    setDefValues((prevState) => {
      return { ...prevState, order: e.target.value };
    });
  }

  return (
    <menu>
      <span>
        Order:
        <Select
          value={defValues.order}
          options={orderOPTIONS}
          onChange={(e: any) => {
            handleDirection(e);
          }}
        />
      </span>
      <input
        type="text"
        className={style.margin}
        onChange={(e) => {
          collectSearchQueries(e);
        }}
        onKeyDown={(e) => {
          handleEnter(e);
        }}
        defaultValue={defValues.search}
      />
      <Select
        options={charOPTIONS}
        className={style.margin}
        defOption={{ label: "Filter", value: "" }}
        value={defValues.filter}
        onChange={(e: any) => {
          collectFilterQueries(e);
        }}
      />
      <button
        className={"button-6 " + style.buttonMargin}
        onClick={handleFiltering}
      >
        Save
      </button>
    </menu>
  );
}
