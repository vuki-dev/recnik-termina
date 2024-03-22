const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export async function fetchData(params: string) {
  const response = await fetch(apiUrl + params);

  if (!response.ok) {
    throw new Error("Error occured.");
  }

  const resData = await response.json();

  return resData;
}

export async function fetchNewTerm(token: string, termData: any) {
  const response = await fetch(`${apiUrl}api/admin/terms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(termData),
  });

  if (!response.ok) {
    throw new Error("Error creating term.");
  }

  const resData = await response.json();
  return resData;
}

export async function fetchEditedTerm(token: string, slug: string, termData: any) {
  const response = await fetch(`${apiUrl}api/admin/terms/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(termData),
  });

  if (!response.ok) {
    throw new Error("Error editing term.");
  }

  const resData = await response.json();
  return resData;
}

export async function fetchDeletedTerm(token: string, id:string) {
  const response = await fetch(`${apiUrl}api/admin/terms/${id}`, {
    method: "DELETE",
    headers: {
      //"Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error deleting term.");
  }

  const resData = await response.json();
  return resData;
}

export async function fetchRelatedTermsSearch(search: string) {
  const response = await fetch(`${apiUrl}public/api/terms?search=${search}`);

  if (!response.ok) {
    throw new Error("Cannot search at the moment");
  }

  const resData = await response.json();
  return resData;
}
