import { render, screen, waitFor } from '@testing-library/react';
import LeaderBoardPage from '../src/pages/LeaderBoardPage'; // Adjust path as needed
import { vi, expect, describe, it } from 'vitest';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import React from 'react';
import '@testing-library/jest-dom';

// Mocking dependencies
vi.mock('../redux/hook', () => ({
  useAppSelector: vi.fn((selector) => {
    if (selector.name === 'session') {
      return { token: 'mock-token' };
    }
    if (selector.name === 'user') {
      return {
        userInfo: { username: 'mockUser', overallScore: 50 },
      };
    }
  }),
}));

vi.mock('../src/api/apiSdk', () => ({
  default: vi.fn(() => ({
    getAllUsers: vi.fn(() =>
      Promise.resolve([
        { username: 'Alice', overallScore: 100 },
        { username: 'Bob', overallScore: 80 },
        { username: 'mockUser', overallScore: 50 },
      ]),
    ),
  })),
}));

// Create a mock Redux store
const mockReducer = (state, action) => state;
const mockStore = createStore(mockReducer, {
  session: { token: 'mock-token' }, // Provide the initial state for session
  user: { userInfo: { username: 'mockUser', overallScore: 50 } },
});

describe('LeaderBoardPage', () => {
  it('fetches and displays leaderboard data correctly', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <LeaderBoardPage />
        </MemoryRouter>
      </Provider>,
    );

    // Wait for leaderboard data to load and check if users are displayed
    await waitFor(() => expect(screen.getByText('Alice')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Bob')).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText('mockUser')).toBeInTheDocument(),
    );
  });

  it('renders LeaderBoard when the user has a score greater than 0', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <LeaderBoardPage />
        </MemoryRouter>
      </Provider>,
    );

    // Wait for LeaderBoard to render
    await waitFor(() =>
      expect(screen.getByText('🏆 Leaderboard 🏆')).toBeInTheDocument(),
    );

    // Check that leaderboard users are displayed
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('mockUser')).toBeInTheDocument();
  });
});
