import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  wishlistItems: JSON.parse(localStorage.getItem("wishlist")) || [],
  
  addToWishlist: (product) => set((state) => {
    const exists = state.wishlistItems.find((item) => item._id === product._id);
    if (exists) return state;
    const newItems = [...state.wishlistItems, product];
    localStorage.setItem("wishlist", JSON.stringify(newItems));
    return { wishlistItems: newItems };
  }),
  
  removeFromWishlist: (id) => set((state) => {
    const newItems = state.wishlistItems.filter((item) => item._id !== id);
    localStorage.setItem("wishlist", JSON.stringify(newItems));
    return { wishlistItems: newItems };
  }),
  
  isInWishlist: (id) => get().wishlistItems.some((item) => item._id === id)
}));
