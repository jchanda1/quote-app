import { configureStore } from "@reduxjs/toolkit";
import quoteSlice from "./slices/quoteSlice";

const store = configureStore({ reducer: { quote: quoteSlice } });

export default store;
