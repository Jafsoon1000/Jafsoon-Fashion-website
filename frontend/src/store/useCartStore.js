import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  
  addToCart: (product, quantity = 1) => set((state) => {
    const existItem = state.cartItems.find((x) => x._id === product._id);
    let newItems;
    if (existItem) {
      newItems = state.cartItems.map((x) =>
        x._id === product._id ? { ...x, quantity: x.quantity + quantity } : x
      );
    } else {
      newItems = [...state.cartItems, { ...product, quantity }];
    }
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    return { cartItems: newItems };
  }),
  
  removeFromCart: (id) => set((state) => {
    const newItems = state.cartItems.filter((x) => x._id !== id);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    return { cartItems: newItems };
  }),
  
  updateQuantity: (id, quantity) => set((state) => {
    if (quantity < 1) return state;
    const newItems = state.cartItems.map((x) => (x._id === id ? { ...x, quantity } : x));
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    return { cartItems: newItems };
  }),
  
  clearCart: () => set(() => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    return { cartItems: [] };
  }),
  
  itemsPrice: () => get().cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
  
  totalItems: () => get().cartItems.reduce((acc, item) => acc + item.quantity, 0)
}));
