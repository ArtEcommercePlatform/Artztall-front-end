import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SignupModal from '../SignupModal'; // Adjust the import path if necessary
import '@testing-library/jest-dom';
import { ToastContainer } from 'react-toastify';

// Mocking the necessary functions or modules
vi.mock('react-toastify', async (importOriginal) => {
  const actual: typeof import('react-toastify') = await importOriginal();

  return {
    ...actual,
    ToastContainer: () => <div>Mock ToastContainer</div>, // Replace with a simple mock if needed
    toast: {
      ...actual.toast,
      error: vi.fn(),
      success: vi.fn(),
    },
  };
});


describe('SignupModal', () => {
  // Helper function to render the SignupModal with the ToastContainer
  const renderWithToastContainer = () => {
    render(
      <>
        <SignupModal isOpen={false} onClose={() => {}} />
        <ToastContainer />
      </>
    );
  };

  it('should render the initial form with step 1 fields', () => {
    renderWithToastContainer();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up as a buyer/i)).toBeInTheDocument();
  });

  it('should show the profile image input and preview when a file is uploaded', async () => {
    renderWithToastContainer();

    const fileInput = screen.getByLabelText(/profile image/i);
    const file = new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' });

    // Simulate file selection
    await userEvent.upload(fileInput, file);

    // Check for the preview image
    const imagePreview = await screen.findByAltText(/profile preview/i);
    expect(imagePreview).toBeInTheDocument();
  });

  it('should show an error message if an invalid file type is uploaded', async () => {
    renderWithToastContainer();

    const fileInput = screen.getByLabelText(/profile image/i);
    const invalidFile = new File(['dummy content'], 'document.pdf', { type: 'application/pdf' });

    // Simulate file selection
    await userEvent.upload(fileInput, invalidFile);

    // Expect an error toast message to be displayed
    expect(await screen.findByText(/please upload an image file/i)).toBeInTheDocument();
  });

  it('should navigate to the next step when the "Next" button is clicked', async () => {
    renderWithToastContainer();

    // Fill out the first step and click "Next"
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    // Click the next button
    const nextButton = screen.getByText(/next/i);
    userEvent.click(nextButton);

    // Verify the form navigated to step 2
    expect(await screen.findByText(/step 2/i)).toBeInTheDocument();
  });

  it('should display an error if required fields are missing on submission', async () => {
    renderWithToastContainer();

    // Click the submit button without filling out the form
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);

    // Verify that an error message is shown
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  it('should call the toast.success on successful form submission', async () => {
    renderWithToastContainer();

    // Mock a successful response from the API
    const mockSubmit = vi.fn(() => Promise.resolve());

    // Fill out the form and submit
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
      expect(vi.mocked(alert)).toHaveBeenCalledWith('Form submitted successfully!');
    });
  });

  it('should handle file size error', async () => {
    renderWithToastContainer();

    const fileInput = screen.getByLabelText(/profile image/i);
    const largeFile = new File(new Array(6 * 1024 * 1024).fill('a'), 'large-image.jpg', { type: 'image/jpeg' });

    // Simulate file selection
    await userEvent.upload(fileInput, largeFile);

    // Expect an error toast message to appear
    expect(await screen.findByText(/image size should be less than 5mb/i)).toBeInTheDocument();
  });
});
