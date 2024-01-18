export const initialState = {
    email: "",
    password: "",
    touched: {
      email: false,
      password: false,
    },
    isEmailValid: false,
    isPasswordValid: false,
    isFormValid: false,
  };
  
  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "SET_BLUR":
        return { ...state, touched: { ...state.touched, [action.field]: true } };
      case "SET_VALIDITY":
        return { ...state, [action.field]: action.value };
      case "RESET":
        return { ...initialState };
      default:
        return { ...state };
    }
  };


  export default formReducer