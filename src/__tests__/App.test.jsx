import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Click for a new quote/i);
  expect(linkElement).toBeInTheDocument();
});
