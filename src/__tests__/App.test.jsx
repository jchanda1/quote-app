import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "../App";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  quotes: {
    quotes: { quote: "Test quote", author: "Test author" },
    loading: false,
  },
};

test("renders learn react link", () => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Click for a new quote/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders quote and author", () => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const quoteElement = screen.getByText(/Test quote/i);
  const authorElement = screen.getByText(/Test author/i);
  expect(quoteElement).toBeInTheDocument();
  expect(authorElement).toBeInTheDocument();
});

test("shows loading indicator when loading", () => {
  const loadingState = {
    quotes: {
      quotes: {},
      loading: true,
    },
  };
  const store = mockStore(loadingState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const loadingElement = screen.getByRole("progressbar");
  expect(loadingElement).toBeInTheDocument();
});

test("button click toggles quote fetch", () => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/Click for a new quote/i);
  fireEvent.click(buttonElement);
  expect(store.getActions()).toContainEqual(expect.objectContaining({ type: "quotes/fetchQuotes/pending" }));
});

test("displays new quote after button click", async () => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const buttonElement = screen.getByText(/Click for a new quote/i);
  fireEvent.click(buttonElement);
  const newQuoteElement = await screen.findByText(/New test quote/i);
  expect(newQuoteElement).toBeInTheDocument();
});

test("displays error message when fetch fails", async () => {
  const errorState = {
    quotes: {
      quotes: {},
      loading: false,
      error: "Failed to fetch quotes",
    },
  };
  const store = mockStore(errorState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const errorMessage = await screen.findByText(/Failed to fetch quotes/i);
  expect(errorMessage).toBeInTheDocument();
});
