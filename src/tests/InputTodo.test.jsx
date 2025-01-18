import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import InputTodo from "../components/InputTodo";

describe('InputTodo Component', () => {
    const mockAddTodoProps = jest.fn();
    const mockSetCategories = jest.fn();
  
    const categories = ['Work', 'Personal'];
  
    test('renders the InputTodo component correctly', () => {
      render(
        <InputTodo
          addTodoProps={mockAddTodoProps}
          categories={categories}
          setCategories={mockSetCategories}
        />
      );
  
      expect(screen.getByPlaceholderText('Add todo...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Datum auswählen')).toBeInTheDocument();
    });
});