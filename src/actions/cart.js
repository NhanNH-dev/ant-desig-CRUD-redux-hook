//action creator
export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
export const handle_Quantity = (index, flag) => {
  return {
    type: "INC_DEC_TO_CART",
    payload: index,
    flag,
  };
};
