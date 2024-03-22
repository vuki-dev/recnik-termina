export function setPageParam(location?: any, newSearchParams?: any) {
  if (location.search.includes("page")) {
    newSearchParams.set("page", 1);
  } else {
    newSearchParams.append("page", 1);
  }

  return newSearchParams;
}

export function handleSearchQuery(location?: any, query?: string, newSearchParams?: any) {
  //const searchQuery = "search=" + query.searchParams;

  if (location.search.includes("search")) {
    newSearchParams.set("search", query);
  } else {
    newSearchParams.append("search", query);
  }

  return newSearchParams;
}

export function handleFilterQuery(location?: any, query?: string, newSearchParams?: any) {
  if (location.search.includes("first_letter")) {
    newSearchParams.set("first_letter", query);
  } else {
    newSearchParams.append("first_letter", query);
  }

  return newSearchParams;
}

export function handleFiltering(navigate: any) {
  let newSearchParams = new URLSearchParams(location.search);

  newSearchParams = setPageParam();
  newSearchParams = handleSearchQuery();
  newSearchParams = handleFilterQuery();

  newSearchParams.toString();

  // Update the URL
  navigate(`?${newSearchParams}`);
}

export function handleSorting(location?: any, navigate?: any, sortParams?: any) {
  let newSearchParams = new URLSearchParams(location.search);
  if (location.search.includes("sort")) {
    newSearchParams.set("sort", sortParams);
  } else {
    newSearchParams.append("sort", sortParams);
  }

  navigate("?" + newSearchParams.toString());
}