import { render, screen } from '@testing-library/react';
import App from '../src/App'; // Adjust the import path as needed
import LoginPage from '../src/pages/Login';
import HomePage from '../src/pages/HomePage';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { login } from '../src/actions/session';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';

vi.mock('../src/actions/session', () => ({
  login: vi.fn(),
}));

describe('Non Sign In Navigation', () => {
  it('stays at the login page when no credentials are given and login button is clicked', async () => {
    render(<App />);

    const loginButton = screen.getByRole('button', { name: /Login/i });
    await userEvent.click(loginButton);

    expect(
      await screen.findByText('Password or email incorrect'),
    ).toBeInTheDocument();
  });

  it('navigates to the signup page where the hyperlink is clicked', async () => {
    render(<App />);

    const hyperlink = screen.getByRole('link', { name: /here/i });
    await userEvent.click(hyperlink);

    expect(await screen.findByText('Create an account')).toBeInTheDocument();
  });
});

const mockStore = configureStore();
describe('Login Required Navigation', () => {
  beforeEach(async () => {
    // Set up mock Redux state
    const initialState = {
      session: { token: 'mock-token' },
      user: {
        userInfo: {
          _id: 'mock-id',
          email: 'mock-email',
          password: 'mock-password',
          sub: 'mock-sub',
          username: 'mock-username',
          overallScore: 0,
          graduated: false,
        },
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    // Wait for the mock API to resolve and cards to render
    await screen.findByText('Welcome to the game FraudNinja!');
  });
  it('simulated login directs to the home page', async () => {
    expect(
      await screen.findByText('Welcome to the game FraudNinja!'),
    ).toBeInTheDocument();

    const playButton = screen.getByRole('button', { name: /Play/i });
    await userEvent.click(playButton);

    // Assert navigation happens
    expect(window.location.pathname).toBe('/signup');
  });
});
