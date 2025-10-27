import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice.js";
import categoryReducer from "./slices/CategorySlice.js";
import sparepartReducer from "./slices/sparepartSlice.js";
import statsReducer from "./slices/statsSlice.js";
import toastReducer from "./slices/toastSlice.js";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    products: productReducer,
    category: categoryReducer,
    sparepart: sparepartReducer,
    stats: statsReducer,
  },
});
