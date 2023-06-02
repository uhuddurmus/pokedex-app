import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach (()=>{
  render(<App />);
});
test('Check is pokedex nav bar is loading loaded', () => {
  const linkElement = screen.getByText(/Inventory/i);
  expect(linkElement).toBeInTheDocument();
});
test('Check inventory', () => {
  const linkElement =  screen.getByTestId("envanter")
  //event
  expect(linkElement).toBeInTheDocument()
});

