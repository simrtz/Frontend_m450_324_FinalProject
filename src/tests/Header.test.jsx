import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders the header', () => {
    render(<Header />);

    const headerElement = screen.getByText("todos")
    expect(headerElement).toBeInTheDocument();
  });
});
