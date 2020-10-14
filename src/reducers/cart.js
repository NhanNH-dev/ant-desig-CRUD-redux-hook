const initialState = {
  list_product: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let cart_update = [...state.list_product];
      let index = cart_update.findIndex(
        (book) => book.id === action.payload.id
      );

      if (index !== -1) {
        cart_update[index].quantity += 1;
      } else {
        cart_update.push(action.payload);
      }

      return { ...state, list_product: cart_update };
    }

    case "INC_DEC_TO_CART": {
      const { index, flag } = action.payload;
      let cart_update = [...state.list_product];

      if (flag) {
        cart_update[index].quantity += 1;
      } else {
        if (cart_update[index].quantity > 1) {
          cart_update[index].quantity -= 1;
        }
      }

      return { ...state, list_product: cart_update };
    }

    case "DELETE_TO_CART": {
      let cart_update = [...state.list_product];
      cart_update.splice(action.index, 1);

      return { ...state, list_product: cart_update };
    }

    default:
      return { ...state };
  }
};

export default cartReducer;
