import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LoginModal from '../LoginModal';
import { apiClient } from '../../services/apiClient';
import { useToast } from '../../assets/components/toast/Toast';
import { MemoryRouter } from 'react-router-dom';

// Mock apiClient and make sure post is a mock function
vi.mock('../../services/apiClient', () => {
  return {
    apiClient: {
      post: vi.fn(),
    },
  };
});

vi.mock('../../assets/components/toast/Toast', () => {
  return {
    useToast: vi.fn(() => ({
      success: vi.fn(),
      error: vi.fn(),
    })),
  };
});

describe('LoginModal', () => {
  const mockOnClose = vi.fn();
  const mockOnLoginSuccess = vi.fn();
  
  it('renders the LoginModal and checks initial state', () => {
    render(
      <MemoryRouter>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </MemoryRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('shows error when the login fails', async () => {
    // Ensure the mock function is typed correctly for TypeScript
    (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));
    const toast = useToast();

    render(
      <MemoryRouter>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  it('calls onLoginSuccess when login is successful', async () => {
    (apiClient.post as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: {
        token: 'mock-token',
        id: '123',
        email: 'test@example.com',
        name: 'John Doe',
        profImg: '',
        userType: 'BUYER',
        bio: 'A user bio',
        artworkCategories: [],
        address: {
          id: '1',
          street: '123 Main St',
          city: 'City',
          state: 'State',
          country: 'Country',
          postalCode: '12345',
          default: true,
        },
        verified: true,
      },
    });
    const toast = useToast();

    render(
      <MemoryRouter>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Welcome back, John Doe!');
      expect(mockOnLoginSuccess).toHaveBeenCalledWith(expect.objectContaining({
        email: 'test@example.com',
        userType: 'BUYER',
      }));
    });
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <MemoryRouter>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
