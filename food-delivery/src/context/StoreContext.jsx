import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
   // Local storage se cart data retrieve karna
   const getCartFromLocalStorage = () => {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : {};
   };

   const [cartItems, setCartItems] = useState(getCartFromLocalStorage);

   // Cart data local storage mein save karna
   useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
   }, [cartItems]);

   const addToCart = (itemId) => {
      setCartItems((prev) => ({
         ...prev,
         [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
      }));
   };

   const removeFromCart = (itemId) => {
      setCartItems((prev) => {
         const updatedCart = { ...prev };
         if (updatedCart[itemId] > 1) {
            updatedCart[itemId] -= 1;
         } else {
            delete updatedCart[itemId];
         }
         return updatedCart;
      });
   };

   const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
         if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
            if (itemInfo) {
               totalAmount += itemInfo.price * cartItems[item];
            }
         }
      }
      return totalAmount;
   };

   const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
   };

   return (
      <StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   );
};

export default StoreContextProvider;
