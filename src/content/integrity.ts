export const assertUniqueValues = (
  domain: string,
  field: string,
  values: readonly string[],
) => {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);

  if (duplicates.length > 0) {
    throw new Error(
      `${domain} contains duplicate ${field}: ${[...new Set(duplicates)].join(", ")}`,
    );
  }
};
