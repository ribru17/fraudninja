import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import HomePage from '../src/pages/HomePage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';

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

describe('Create Home Page', () => {
  it('renders "Welcome to the game FraudNinja!" heading', () => {
    renderWithProviders(<HomePage />);
    const welcomeMessage = screen.getByText(/Welcome to the game FraudNinja!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders the Play button', () => {
    renderWithProviders(<HomePage />);

    const playButton = screen.getByRole('button', { name: /Play/i });
    expect(playButton).toBeInTheDocument();
  });

  it('navigates to the Play page when the Play button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);
    const playButton = screen.getByRole('button', { name: /Play/i });
    await user.click(playButton);

    // Assert navigation happens
    expect(window.location.pathname).toBe('/');
  });
});
