import { render, screen, waitFor } from '@testing-library/react';
import ResourcePage from '../src/pages/ResourcePage'; // Adjust path as needed
import { vi, expect, describe, it } from 'vitest';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import React from 'react';
import '@testing-library/jest-dom';
// Mocking dependencies
vi.mock('../redux/hook', () => ({
  useAppSelector: vi.fn(() => ({ token: 'mock-token' })),
}));
vi.mock('../src/api/apiSdk', () => ({
  default: vi.fn(() => ({
    getAllResources: vi.fn(() =>
      Promise.resolve([
        {
          _id: '1',
          category: 'Phishing',
          content:
            'Phishing scams involve tricking individuals into providing sensitive information, such as usernames, passwords, or credit card numbers, often through fake websites or deceptive emails that appear legitimate.',
          links: [
            'https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams',
            'https://www.fbi.gov/how-to-protect-yourself-from-phishing-attack',
          ],
          image: 'mock-image-data',
        },
        {
          _id: '2',
          category: 'Fake job',
          content:
            'Fake job scams involve fraudulent job offers that require applicants to pay upfront for training, materials, or background checks, or to provide sensitive information. These scams often target job seekers with promises of high pay, remote work, or guaranteed employment.',
          links: [
            'https://www.consumer.ftc.gov/articles/job-scams',
            'https://www.fbi.gov/how-to-spot-and-avoid-job-scams',
          ],
          image: '',
        },
      ]),
    ),
  })),
}));
// Create a mock Redux store
const mockReducer = (state, action) => state;
const mockStore = createStore(mockReducer, {
  session: { token: 'mock-token' }, // Provide the initial state for session
});
describe('ResourcePage', () => {
  it('displays the correct resource content after fetching', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          {' '}
          {/* Wrap the component in MemoryRouter */}
          <ResourcePage />
        </MemoryRouter>
      </Provider>,
    );
    // Wait for the resources to be fetched and rendered
    await waitFor(() => screen.getByText('Phishing'));
    await waitFor(() => screen.getByText('Fake job'));
    // Check if the resource text content is displayed
    expect(screen.getByText('Phishing')).toBeInTheDocument();
    expect(screen.getByText('Fake job')).toBeInTheDocument();
  });
  it('renders resource content correctly', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          {' '}
          {/* Wrap the component in MemoryRouter */}
          <ResourcePage />
        </MemoryRouter>
      </Provider>,
    );
    // Wait for the resources to be fetched and rendered
    await waitFor(() => screen.getByText('Phishing'));
    await waitFor(() => screen.getByText('Fake job'));
    // Verify that text content is displayed for each resource
    expect(screen.getByText('Phishing')).toBeInTheDocument(); // category for first resource
    expect(screen.getByText('Fake job')).toBeInTheDocument(); // category for second resource
    expect(
      screen.getByText(
        'Phishing scams involve tricking individuals into providing sensitive information, such as usernames, passwords, or credit card numbers, often through fake websites or deceptive emails that appear legitimate.',
      ),
    ).toBeInTheDocument(); // content for first resource
  });
});
