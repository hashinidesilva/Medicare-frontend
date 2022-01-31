import { useCallback, useReducer } from "react";

const initialState = (initialValue) => {
  return {
    value: initialValue,
    isTouched: false
  };
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {value: action.value, isTouched: state.isTouched};
  }

  if (action.type === "BLUR") {
    return {isTouched: true, value: state.value};
  }

};

const useInput = (validator, initialValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState(initialValue));

  const valueIsValid = validator(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = useCallback((newValue) => {
    return dispatch({type: "INPUT", value: newValue});
  }, [dispatch]);

  const inputBlurHandler = () => {
    return dispatch({type: "BLUR"});
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler
  };

};

export default useInput;