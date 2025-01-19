import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import InputTodo from "../components/InputTodo";
import * as fireEvent from "react-dom/test-utils";

describe('InputTodo Component', () => {
    const mockAddTodoProps = jest.fn();
    const mockSetCategories = jest.fn();

    const categories = ['Work', 'Personal'];

    beforeEach(() => {
        render(
            <InputTodo
                addTodoProps={mockAddTodoProps}
                categories={categories}
                setCategories={mockSetCategories}
            />
        );
    });

    test('renders the InputTodo component correctly', () => {
        expect(screen.getByPlaceholderText('Add todo...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Datum auswählen')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('combobox', { name: /category/i })).toBeInTheDocument();
        expect(screen.getByTestId('priority-select')).toBeInTheDocument();
    });

});