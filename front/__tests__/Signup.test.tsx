import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SignupPage from '../src/pages/SignupPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import '@testing-library/jest-dom';

// Create a mock reducer
const mockReducer = (state, action) => state;

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({ reducer: mockReducer });
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );
};

describe('Create Account Page', () => {
  it('renders a heading with text "Create an account"', () => {
    renderWithProviders(<SignupPage />);
    const header = screen.getByRole('heading', {
      level: 4,
      name: /create an account/i,
    });
    expect(header).toBeInTheDocument();
  });

  it('renders an email input field', () => {
    renderWithProviders(<SignupPage />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('name', 'email');
  });

  it('renders a username input field', () => {
    renderWithProviders(<SignupPage />);
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('name', 'username');
  });

  it('renders a password input field', () => {
    renderWithProviders(<SignupPage />);
    const passwordInput = screen.getAllByLabelText(/Password/i);
    expect(passwordInput[0]).toBeInTheDocument();
    expect(passwordInput[0]).toHaveAttribute('type', 'password');
  });

  it('renders a confirm password input field', () => {
    renderWithProviders(<SignupPage />);
    const confirmPasswordInput = screen.getByLabelText(
      /Confirm your password/i,
    );
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  it('renders a sign-up button', () => {
    renderWithProviders(<SignupPage />);
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
  });

  it('allows interaction with input fields', async () => {
    renderWithProviders(<SignupPage />);
    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInputs = screen.getAllByLabelText(/password/i);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = screen.getByLabelText(
      /confirm your password/i,
    );

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmPasswordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });
});
