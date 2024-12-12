import { useEffect, useState } from "react";
import "./App.css";
import {
  fetchQuotes,
  selectAllQuotes,
  selectLoadingState,
} from "./store/slices/quoteSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Card from "./components/UI/Card.jsx";
import { CircularProgress } from "@mui/material";

function App() {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const quote = useSelector(selectAllQuotes);
  console.log(quote);
  const loading = useSelector(selectLoadingState);
  console.log(loading);

  const quoteCard = <Card quote={quote.quote} author={quote.author} />;

  const loadingCircle = (
    <div>
      <CircularProgress />
    </div>
  );

  const buttonHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch, toggle]);

  return (
    <>
      {loading ? loadingCircle : quoteCard}
      <button onClick={buttonHandler}>Click for a new quote</button>
    </>
  );
}

export default App;
