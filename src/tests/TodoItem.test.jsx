import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import TodoItem from "../components/TodoItem";

describe('TodoItem Component', () => {
    const todo = { id: 1, title: "Todo 1", priority: "HIGH", category: "Work", dueDate: "2025-01-20" }
    
    const categories = ["Work", "Personal"];
    
    const mockHandleChangeProps = jest.fn();
    const mockDeleteTodoProps = jest.fn();
    const mockUpdateTodoItem = jest.fn();
    const mockSetCategories = jest.fn();

    test('renders the TodoItem', () => {
        render(
            <TodoItem
                key={todo.id}
                todo={todo}
                handleChangeProps={mockHandleChangeProps}
                deleteTodoProps={mockDeleteTodoProps}
                updateTodoItem={mockUpdateTodoItem}
                categories={categories}
                setCategories={mockSetCategories}
            />
        );

        expect(screen.getByDisplayValue(todo.title)).toBeInTheDocument();
    });
});