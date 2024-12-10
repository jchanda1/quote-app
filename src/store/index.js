import { configureStore } from "@reduxjs/toolkit";
import quoteSlice from "../store/slices/quoteSlice";

const store = configureStore({ reducer: { quote: quoteSlice } });

export default store;
