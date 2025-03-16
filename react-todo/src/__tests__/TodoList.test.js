import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  // Test initial render
  test("renders TodoList component with initial todos", () => {
    render(<TodoList />);

    // Check if the title is rendered
    expect(screen.getByText("Todo List")).toBeInTheDocument();

    // Check if initial todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
  });

  // Test adding a todo
  test("adds a new todo when the form is submitted", () => {
    render(<TodoList />);

    // Get the input field and submit button
    const inputElement = screen.getByTestId("todo-input");
    const buttonElement = screen.getByText("Add Todo");

    // Enter text and submit the form
    fireEvent.change(inputElement, { target: { value: "Test new todo" } });
    fireEvent.click(buttonElement);

    // Check if the new todo is added
    expect(screen.getByText("Test new todo")).toBeInTheDocument();

    // Check if the input field is cleared
    expect(inputElement.value).toBe("");
  });

  // Test toggling a todo
  test("toggles a todo when clicked", () => {
    render(<TodoList />);

    // Get the first todo
    const todoElement = screen.getByText("Learn React");

    // Initially, the todo should not be completed
    expect(todoElement).not.toHaveStyle("text-decoration: line-through");

    // Click the todo to mark it as completed
    fireEvent.click(todoElement);

    // Now the todo should be marked as completed
    expect(todoElement).toHaveStyle("text-decoration: line-through");

    // Click again to toggle back
    fireEvent.click(todoElement);

    // The todo should no longer be marked as completed
    expect(todoElement).not.toHaveStyle("text-decoration: line-through");
  });

  // Test deleting a todo
  test("deletes a todo when delete button is clicked", () => {
    render(<TodoList />);

    // Get the first todo's delete button
    const deleteButton = screen.getAllByText("Delete")[0];

    // Get the first todo text
    const todoText = "Learn React";
    expect(screen.getByText(todoText)).toBeInTheDocument();

    // Click the delete button
    fireEvent.click(deleteButton);

    // Check if the todo is deleted
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });
});
