import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlayPage from '../src/pages/PlayPage';
import { vi, describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import React from 'react';
import '@testing-library/jest-dom';

vi.mock('../redux/hook', () => ({
  useAppSelector: vi.fn(() => ({
    session: { token: 'mock-token' },
    user: { userInfo: { _id: 'mock-user-id', overallScore: 50 } },
  })),
  useAppDispatch: vi.fn(),
}));

vi.mock('../src/api/apiSdk', () => ({
  default: vi.fn(() => ({
    getRandomExercises: vi.fn(() =>
      Promise.resolve([
        {
          type: 'email',
          scam: true,
          emailSender: 'scammer@example.com',
          message: 'You have won $1,000,000! Click here to claim your prize.',
          feedback: 'This is a classic phishing email scam.',
        },
      ]),
    ),
    updateScoreUser: vi.fn(() => Promise.resolve({ overallScore: 60 })),
  })),
}));

const mockReducer = (state: any) => state;
const mockStore = createStore(mockReducer, {
  session: { token: 'mock-token' },
  user: { userInfo: { _id: 'mock-user-id', overallScore: 50 } },
});

describe('PlayPage Component', () => {
  it('renders the "Honorable" and "Corrupt" buttons', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <PlayPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('swipeable-card')).toBeInTheDocument();
    });

    // Use a function matcher to find the buttons
    const honorableButton = screen.getByRole('button', { name: /honorable/i });
    const corruptButton = screen.getByRole('button', { name: /corrupt/i });

    expect(honorableButton).toBeInTheDocument();
    expect(corruptButton).toBeInTheDocument();

    fireEvent.click(honorableButton);
    fireEvent.click(corruptButton);

    expect(honorableButton).not.toBeDisabled();
    expect(corruptButton).not.toBeDisabled();
  });
});
