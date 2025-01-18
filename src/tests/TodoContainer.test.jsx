import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import TodoContainer from "../components/TodoContainer";

global.fetch = jest.fn();

describe('TodoContainer Component', () => {
    beforeEach(() => {
      fetch.mockClear();
    });

    test('renders the TodoContainer and fetches todos', async () => {
        const mockTodos = [
            { id: 1, title: "Sample Todo 1", completed: false, category: "Work", priority: "HIGH", dueDate: Date.now() },
            { id: 2, title: "Sample Todo 2", completed: true, category: "Private", priority: "LOW", dueDate: Date.now() },
          ];
      
          fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
          });
      
          render(<TodoContainer />);
      
          await waitFor(() => {
            expect(screen.getByText("Sample Todo 1")).toBeInTheDocument();
            expect(screen.getByText("Sample Todo 2")).toBeInTheDocument();
          });
    });
});