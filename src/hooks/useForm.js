import { useEffect, useReducer, useState } from "react"
import { formInitialsValue, logInRegisterInitial } from "../constant/initialsState"
import { ingregdientsReducer } from "../components/reducers/ingregdientsReducer"

export const useForm = () => {
  const [stateIngredient, dispatch] = useReducer(ingregdientsReducer, [])
  const [form, setForm] = useState({})
  
  const initialRecip = () => setForm(formInitialsValue)
  
  const initialLoginRegister = () => setForm(logInRegisterInitial)

  useEffect(() => {
    setForm({
      ...form,
      ingredients: stateIngredient
    })
  }, [stateIngredient])

  const addIngredient = (ingr) => {    
    dispatch({
      type: '[INGR] ADD',
      payload: ingr
    })  
  }
  
  const deleteIngredients = (name) => {
    dispatch({
      type:'[INGR] DELETE',
      payload: name
    })
  }

  const equalForm = (res) => {
    setForm(res)
    dispatch({
      type: '[INGR] ALLINGR',
      payload: res.ingredients
    })
  }



  
  const buildForm = (event)=> {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });        
  }

  return {
      form,
      buildForm,
      equalForm,
      stateIngredient,
      addIngredient,
      deleteIngredients,
      initialRecip,
      initialLoginRegister
  }
}