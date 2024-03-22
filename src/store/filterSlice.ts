import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { handleSorting } from "../utils/filtering";

const queryParamsState = {
  filterParams: "",
  sortDirection: "",
  sortColumn: "",
  sortParams: {},
  searchParams: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState: queryParamsState,
  reducers: {
    setFilterParams(state, action: PayloadAction<string>) {
      state.filterParams = action.payload;
    },

    setSearchParams(state, action: PayloadAction<string>) {
      state.searchParams = action.payload;
    },

    setSortColumn(state, action: PayloadAction<string>) {
      state.sortColumn = action.payload;
    },
    setSortDirection(state, action: PayloadAction<string>) {
      state.sortDirection = action.payload
    },
  },
});

export function sortColumnAction(sortData: any, location: any, navigate: any) {
  return (dispatch: any, getState: () => any) => {
    dispatch(filterSlice.actions.setSortColumn(sortData));

    const state = getState();
    const sortDirection = state.filter.sortDirection;
    const sortColumn = state.filter.sortColumn;

    const sortParams = {
      column: sortColumn.column,
      direction: sortDirection ? "asc" : 'desc',
    };

    handleSorting(location, navigate, JSON.stringify(sortParams));
  };
}

export function sortDirectionAction(value: string, location: any, navigate: any) {
  return (dispatch: any, getState: () => any) => {
    dispatch(filterSlice.actions.setSortDirection(value));

    const state = getState();
    const sortDirection = state.filter.sortDirection;
    const sortColumn = state.filter.sortColumn;

    const sortParams = {
      column: sortColumn.length === 0 ? 'term' : sortColumn.column,
      direction: sortDirection
    };

    handleSorting(location, navigate, JSON.stringify(sortParams));
  };
}

export const filterActions = filterSlice.actions;

export default filterSlice;
