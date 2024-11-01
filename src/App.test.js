import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./components/App";
import { QuestionReducer } from "./reducers/QuestionReducer";

jest.mock("./reducers/QuestionReducer", () => ({
  QuestionReducer: jest.fn(() => ({
    questions: [],
    status: "loading",
    index: 0,
    points: 0,
    answer: [],
    highscore: 0,
  })),
}));

describe("App component", () => {
  it("renders loader when status is loading", () => {
    render(<App />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders start screen when status is ready", () => {
    const mockDispatch = jest.fn();
    const mockQuestions = [{ id: 1, points: 10 }];
    QuestionReducer.mockImplementationOnce(() => ({
      questions: mockQuestions,
      status: "ready",
      index: 0,
      points: 0,
      answer: [],
      highscore: 0,
    }));
    render(<App />);
    expect(screen.getByText("Start Quiz")).toBeInTheDocument();
  });

  it("renders question when status is start", () => {
    const mockDispatch = jest.fn();
    const mockQuestions = [{ id: 1, points: 10 }];
    QuestionReducer.mockImplementationOnce(() => ({
      questions: mockQuestions,
      status: "start",
      index: 0,
      points: 0,
      answer: [],
      highscore: 0,
    }));
    render(<App />);
    expect(screen.getByText("Question 1")).toBeInTheDocument();
  });

  it("renders finished quiz when status is finished", () => {
    const mockDispatch = jest.fn();
    const mockQuestions = [{ id: 1, points: 10 }];
    QuestionReducer.mockImplementationOnce(() => ({
      questions: mockQuestions,
      status: "finished",
      index: 0,
      points: 10,
      answer: [],
      highscore: 0,
    }));
    render(<App />);
    expect(screen.getByText("Finished Quiz")).toBeInTheDocument();
  });

  it("renders error when status is error", () => {
    const mockDispatch = jest.fn();
    QuestionReducer.mockImplementationOnce(() => ({
      questions: [],
      status: "error",
      index: 0,
      points: 0,
      answer: [],
      highscore: 0,
    }));
    render(<App />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("calls dispatch when next question button is clicked", () => {
    const mockDispatch = jest.fn();
    const mockQuestions = [{ id: 1, points: 10 }];
    QuestionReducer.mockImplementationOnce(() => ({
      questions: mockQuestions,
      status: "start",
      index: 0,
      points: 0,
      answer: [],
      highscore: 0,
    }));
    render(<App />);
    const nextButton = screen.getByText("Next Question");
    fireEvent.click(nextButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it("calls dispatch when previous question button is clicked", () => {
    const mockDispatch = jest.fn();
    const mockQuestions = [{ id: 1, points: 10 }];
    QuestionReducer.mockImplementationOnce(() => ({
      questions: mockQuestions,
      status: "start",
      index: 1,
      points: 0,
      answer: [],
      highscore: 0,
    }));
    render(<App />);
    const prevButton = screen.getByText("Previous Question");
    fireEvent.click(prevButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
