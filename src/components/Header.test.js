import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders header with logo and title", () => {
  render(<Header />);
  const headerElement = screen.getByTestId("app-header");
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveClass("app-header");
  expect(screen.getByAltText("React logo")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "The React Quiz"
  );
});
