import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../src/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

describe('Login Page', () => {
  it('renders login heading', () => {
    render(<App />);
    const header = screen.getByRole('heading', { level: 4, name: /Login/i });
    expect(header).toBeInTheDocument();
  });

  it('renders an email input field', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/Email/i); // Ensure Formik has a `label` or `aria-label` for accessibility
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('name', 'email');
  });

  it('renders a password input field', () => {
    render(<App />);
    const passwordInput = screen.getByLabelText(/Password/i); // Ensure Formik has a `label` or `aria-label` for accessibility
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('renders create account text with a link', () => {
    render(<App />);
    const linkText = screen.getByText(
      /If you don't already have an account, click/i,
    );
    const link = screen.getByRole('link', { name: /here/i });
    expect(linkText).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it('renders a login button', () => {
    render(<App />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('allows interaction with email and password inputs', async () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});
