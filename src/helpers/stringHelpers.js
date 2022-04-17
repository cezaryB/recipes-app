export const translateTextToArray = (value) => {
  const clearedValue = value.replace(/,,+/g, ',').replace(/\s+/g,' ').trim();
  return clearedValue.split(',').filter((singleValue) => singleValue && singleValue);
};

