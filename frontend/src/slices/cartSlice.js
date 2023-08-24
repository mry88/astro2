import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
<<<<<<< HEAD
=======
      const product = action.payload;
>>>>>>> main
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

<<<<<<< HEAD
=======
      console.log('Selected features:', product.selectedFeatures);
      console.log('All features:', product.features);

      const featurePrice = product.selectedFeatures.reduce((sum, featureName) => {
        const feature = product.features.find(f => f.name === featureName);
        return sum + (feature ? feature.price : 0);
      }, 0);

      console.log('product price : ', product.price);

      const productTotalPrice = product.price + featurePrice;

>>>>>>> main
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
<<<<<<< HEAD
=======
          selectedFeatures: product.selectedFeatures,
          totalPrice: productTotalPrice,
>>>>>>> main
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
<<<<<<< HEAD
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
=======
        let tempProductItem = {
          ...action.payload,
          cartQuantity: 1,
          selectedFeatures: product.selectedFeatures,
          totalPrice: productTotalPrice,
        };

>>>>>>> main
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
<<<<<<< HEAD
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
=======
          const { price, cartQuantity, selectedFeatures } = cartItem;
          let itemTotal = price * cartQuantity;

          if (selectedFeatures && selectedFeatures.length) {
            // Calculate the total price of the selected features for this item
            const featuresTotal = selectedFeatures.reduce((totalFeaturePrice, featureName) => {
              const feature = cartItem.features.find(f => f.name === featureName);
              if (feature) {
                totalFeaturePrice += feature.price;
              }
              return totalFeaturePrice;
            }, 0);

            // Add features total to the item total
            itemTotal += featuresTotal * cartQuantity;
          }
>>>>>>> main

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
