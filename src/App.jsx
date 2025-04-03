import { useEffect, useState } from "react";
import "./App.css";
import {
  fetchQuotes,
  selectAllQuotes,
  selectLoadingState,
} from "./store/slices/quoteSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Quote from "./components/Quote.jsx";

function App() {
  const dispatch = useDispatch();

  const quote = useSelector(selectAllQuotes);
  const loading = useSelector(selectLoadingState);
  console.log(quote);
  const quoteCard = <Quote quote={quote} />;

  const loadingCircle = <CircularProgress />;

  const buttonHandler = () => {
    dispatch(fetchQuotes());
  };

  return (
    <>
      <div>{loading ? loadingCircle : quoteCard}</div>
      <button onClick={buttonHandler}>Click for a new quote</button>
    </>
  );
}

export default App;
