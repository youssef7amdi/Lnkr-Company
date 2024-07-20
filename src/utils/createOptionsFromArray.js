export function createOptionsFromArray(array) {
  if (!array) return;
  return array.map((item) => {
    return { label: item, value: item };
  });
}
