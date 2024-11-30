import { render, screen, waitFor } from '@testing-library/react';
import PlayPage from '../src/pages/PlayPage'; // Adjust the import path as needed
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mocking the API SDK
vi.mock('../src/api/apiSdk', () => ({
  default: vi.fn(() => ({
    getRandomExercises: vi.fn(() =>
      Promise.resolve([
        {
          type: 'email',
          emailSender: 'sender1@example.com',
          message: 'Card 1',
          scam: false,
          feedback: 'Good',
        },
        {
          type: 'text',
          phoneNumber: '1234567890',
          message: 'Card 2',
          scam: true,
          feedback: 'Scam!',
        },
        {
          type: 'email',
          emailSender: 'sender3@example.com',
          message: 'Card 3',
          scam: false,
          feedback: 'Safe',
        },
      ]),
    ),
  })),
}));

// Create a mock Redux store
const mockStore = configureStore();

describe('PlayPage', () => {
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

    // Render PlayPage wrapped in the Redux <Provider>
    render(
      <Provider store={store}>
        <PlayPage />
      </Provider>,
    );

    // // Wait for the mock API to resolve and cards to render
    await screen.getByTestId('cardContainer');
  });

  it('renders all cards in the document', () => {
    const cardContainer = screen.getByTestId('cardContainer');
    const cards = cardContainer.querySelectorAll('.swipeable-card'); // Select cards by className
    expect(cards.length).toBe(3); // Verify the number of cards
  });

  it('renders the Scam button in the document', () => {
    const scamButton = screen.getByRole('button', { name: /Corrupt!/i });
    expect(scamButton).toBeInTheDocument();
  });

  it('renders the Not a Scam button in the document', () => {
    const notScamButton = screen.getByRole('button', { name: /Honorable/i });
    expect(notScamButton).toBeInTheDocument();
  });
});
