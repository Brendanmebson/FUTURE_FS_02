import { createContext, useReducer } from "react";

const CartContext = createContext();

const initialState = { cart: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const exists = state.cart.find(p => p._id === action.payload._id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(p =>
            p._id === action.payload._id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case "REMOVE":
      return { ...state, cart: state.cart.filter(p => p._id !== action.payload) };
    case "UPDATE":
      return {
        ...state,
        cart: state.cart.map(p =>
          p._id === action.payload.id
            ? { ...p, quantity: action.payload.quantity }
            : p
        ),
      };
    case "CLEAR":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
