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
    const urlHeaders = {
      headers: { "X-Api-Key": "lkUJ9496N0VvDW6t8n8tJw==BTfXZMXc9XOWe6Yn" },
    };
    const response = await fetch(
      "https://api.api-ninjas.com/v1/quotes",
      urlHeaders
    );
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
