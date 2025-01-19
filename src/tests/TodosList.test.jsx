import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import TodosList from "../components/TodosList";


jest.mock("../components/TodoItem", () => ({ todo }) => <li>{todo.text}</li>);

describe("TodosList Component", () => {
  const todos = [
    { id: 1, title: "Todo 1", priority: "HIGH", category: "Work", dueDate: "2025-01-20" },
    { id: 2, title: "Todo 2", priority: "MEDIUM", category: "Personal", dueDate: "2025-01-19" },
    { id: 3, title: "Todo 3", priority: "LOW", category: "Work", dueDate: "2025-01-21" },
  ];

  const categories = ["Work", "Personal"];

  const mockHandleChangeProps = jest.fn();
  const mockDeleteTodoProps = jest.fn();
  const mockUpdateTodoItem = jest.fn();
  const mockSetCategories = jest.fn();

  test("renders todos", () => {
    render(
      <TodosList
        todos={todos}
        handleChangeProps={mockHandleChangeProps}
        deleteTodoProps={mockDeleteTodoProps}
        updateTodoItem={mockUpdateTodoItem}
        categories={categories}
        setCategories={mockSetCategories}
      />
    );

    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(3);
  });
});