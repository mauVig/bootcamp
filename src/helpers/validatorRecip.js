export const validRecip = (form) => {
  const arrErr = [];
  const errBool = {}

  if (form.name === '') {
    arrErr.push({ msg: 'Ingrese un nombre' });
    errBool.name = true
  }
  if (form.description === '') {
    arrErr.push({ msg: 'Ingrese una descripcion' });
    errBool.description = true
  }
  if (form.imagePath === '') {
    arrErr.push({ msg: 'Ingrese la URL para la imagen' });
    errBool.imagePath = true
  }
  if (form.ingredients.length === 0) {
    arrErr.push({ msg: 'Ingrese al menos un ingrediente' });
    errBool.ingredients = true
  }

  if (arrErr.length === 0) {
    const valid = false

    return {
      valid,
      errBool
    };
  } else {
    const valid = arrErr

    return {
      valid,
      errBool
    };
  }
};
