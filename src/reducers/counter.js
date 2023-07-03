export const updateReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADDCART":
      return state + 1;
    default:
      return state;
  }
};

export default updateReducer;
