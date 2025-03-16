import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodoForm from "../components/AddTodoForm";

describe("AddTodoForm Component", () => {
  // Test initial render
  test("renders AddTodoForm component", () => {
    render(<AddTodoForm onAddTodo={() => {}} />);

    // Check if the input field and button are rendered
    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  // Test form submission
  test("calls onAddTodo when form is submitted with valid input", () => {
    // Mock the onAddTodo function
    const mockOnAddTodo = jest.fn();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    // Get the input field and button
    const inputElement = screen.getByTestId("todo-input");
    const buttonElement = screen.getByText("Add Todo");

    // Enter text and submit the form
    fireEvent.change(inputElement, { target: { value: "Test new todo" } });
    fireEvent.click(buttonElement);

    // Check if onAddTodo was called with the correct text
    expect(mockOnAddTodo).toHaveBeenCalledWith("Test new todo");

    // Check if the input field is cleared
    expect(inputElement.value).toBe("");
  });

  // Test form submission with empty input
  test("does not call onAddTodo when form is submitted with empty input", () => {
    // Mock the onAddTodo function
    const mockOnAddTodo = jest.fn();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    // Get the button
    const buttonElement = screen.getByText("Add Todo");

    // Submit the form without entering text
    fireEvent.click(buttonElement);

    // Check if onAddTodo was not called
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
});
