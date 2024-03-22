export const charOPTIONS = Array.from({ length: 26 }, (_, index) => {
  const char = String.fromCharCode(65 + index);
  return { value: char, label: char };
});

export const orderOPTIONS = [
  { value: "asc", label: "ASC" },
  { value: "desc", label: "DESC" },
];
