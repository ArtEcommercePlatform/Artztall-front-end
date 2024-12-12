import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { X, Eye, EyeOff } from "lucide-react";
import { apiClient } from "../services/apiClient";
import LoginModal from "./LoginModal";
import { useToast } from "../assets/components/toast/Toast";
import { BrowserRouter as Router } from "react-router-dom";

// Mock dependencies
jest.mock("../services/apiClient");
jest.mock("../assets/components/toast/Toast");

describe("LoginModal", () => {
  let mockOnClose;
  let mockOnLoginSuccess;
  let mockNavigate;

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnLoginSuccess = jest.fn();
    mockNavigate = jest.fn();
    useToast.mockReturnValue({
      success: jest.fn(),
      error: jest.fn(),
    });
    apiClient.post.mockResolvedValue({
      success: true,
      data: {
        token: "fake-token",
        id: "user-id",
        email: "user@example.com",
        name: "John Doe",
        profImg: "profile.jpg",
        userType: "BUYER",
        bio: "Lorem ipsum",
        artworkCategories: ["Painting"],
        address: {
          id: "address-id",
          street: "123 Main St",
          city: "Somewhere",
          state: "State",
          country: "Country",
          postalCode: "12345",
          default: true,
        },
        verified: true,
      },
    });
  });

  test("renders login modal when isOpen is true", () => {
    render(
      <Router>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("does not render login modal when isOpen is false", () => {
    render(
      <Router>
        <LoginModal isOpen={false} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    expect(screen.queryByText("Login")).toBeNull();
  });

  test("handles form input change", () => {
    render(
      <Router>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  test("shows and hides password correctly", () => {
    render(
      <Router>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    const togglePasswordButton = screen.getByLabelText(/show password/i);
    fireEvent.click(togglePasswordButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(togglePasswordButton);
    expect(passwordInput.type).toBe("password");
  });

  test("calls onLoginSuccess and navigates to correct dashboard on successful login", async () => {
    render(
      <Router>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith("/auth/login", {
        email: "user@example.com",
        password: "password123",
      });
      expect(mockOnLoginSuccess).toHaveBeenCalledWith({
        token: "fake-token",
        id: "user-id",
        email: "user@example.com",
        name: "John Doe",
        profImg: "profile.jpg",
        userType: "BUYER",
        bio: "Lorem ipsum",
        artworkCategories: ["Painting"],
        address: {
          id: "address-id",
          street: "123 Main St",
          city: "Somewhere",
          state: "State",
          country: "Country",
          postalCode: "12345",
          default: true,
        },
        verified: true,
      });
      expect(mockNavigate).toHaveBeenCalledWith("/customer/dashboard");
    });
  });

  test("shows error message on failed login", async () => {
    apiClient.post.mockRejectedValueOnce({ message: "Unauthorized access" });

    render(
      <Router>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password. Please try again.")).toBeInTheDocument();
    });
  });

  test("calls onClose when the close button is clicked", () => {
    render(
      <Router>
        <LoginModal isOpen={true} onClose={mockOnClose} onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
