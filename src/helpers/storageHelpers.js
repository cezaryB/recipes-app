export const saveItem = (storageName, itemValue) => {
  localStorage.getItem(storageName) && localStorage.removeItem(storageName);
  localStorage.setItem(storageName, JSON.stringify(itemValue));
};

export const returnItem = (storageName) => {
  return JSON.parse(localStorage.getItem(storageName));
};


