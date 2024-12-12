import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  quote: "",
  author: "",
  category: "",
  loading: false,
};

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuotes.rejected, (state) => {
        state.loading = false;
        state.quote = [];
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.quote = action.payload[0].quote;
        state.author = action.payload[0].author;
        state.category = action.payload[0].category;
      });
  },
});

export const fetchQuotes = createAsyncThunk("quotes/getQuotes", async () => {
  try {
    const response = await fetch("http://localhost:3000/quotes");
    const data = response.json();
    return data;
  } catch (err) {
    return err.message;
  }
});

export const selectAllQuotes = (state) => {
  return {
    quote: state.quote.quote,
    author: state.quote.author,
    category: state.quote.category,
  };
};

export const selectLoadingState = (state) => state.quote.loading;

export default quoteSlice.reducer;
