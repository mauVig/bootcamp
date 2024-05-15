// Primera letra en mayuscula
export const capitalize = (word) => {
  const res = word.charAt(0).toUpperCase() + word.slice(1);
  return res;
};

// crea un id unico
export const createId = () => new Date().getTime();

// Esta funcion sirve para poder mostrar en una tabla los todos ingredientes
export const showArrBuy = (arr) => {
  let obj = [];
  for (const Arr1 of arr) {
    for (const Arr2 of Arr1.ingredients) {
      obj.push({ name: Arr1.name, ingredients: Arr2.name });
    }
  }
  return obj;
};
