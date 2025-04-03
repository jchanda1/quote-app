import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import App from "../App.jsx";
import { fetchQuotes } from "../store/slices/quoteSlice.js";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../store/slices/quoteSlice.js", () => ({
  fetchQuotes: jest.fn(),
  selectAllQuotes: jest.fn(),
  selectLoadingState: jest.fn(),
}));

jest.mock("../components/UI/Card.jsx", () => () => <div>Mocked Card</div>);

describe("App Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      quotes: {
        quotes: { quote: "Test Quote", author: "Test Author" },
        loading: false,
      },
    });

    fetchQuotes.mockReturnValue({ type: "quotes/fetchQuotes" });
  });

  it("renders the button", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Click for a new quote")).toBeInTheDocument();
  });

  it("renders loading state initially", () => {
    store = mockStore({
      quotes: {
        quotes: {},
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders quote card when not loading", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Mocked Card")).toBeInTheDocument();
  });

  it("dispatches fetchQuotes on mount", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(fetchQuotes).toHaveBeenCalled();
  });

  it("toggles quote on button click", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const button = screen.getByText("Click for a new quote");
    fireEvent.click(button);

    expect(fetchQuotes).toHaveBeenCalledTimes(2);
  });
});
