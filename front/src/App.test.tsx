import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/If you don't already have an account, click/i);
  expect(linkElement).toBeInTheDocument();
});
