import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import  SignupModal  from "../components/SignupModal"; // Adjust path if necessary
import { useToast } from "../assets/components/toast/Toast";
import { apiClient } from "../services/apiClient";
import { uploadImageToCloudinary } from "../services/cloudinary";
import { MemoryRouter } from "react-router-dom";
import React from 'react';  // Add this import to resolve the issue


// Mock dependencies
jest.mock("../assets/components/toast/Toast", () => ({
  useToast: jest.fn(() => ({
    success: jest.fn(),
    error: jest.fn(),
  })),
}));

jest.mock("../services/cloudinary", () => ({
  uploadImageToCloudinary: jest.fn(),
}));

jest.mock("../services/apiClient", () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

describe("SignupModal", () => {
  let onCloseMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    render(
      <MemoryRouter>
        <SignupModal isOpen={true} onClose={onCloseMock} />
      </MemoryRouter>
    );
  });

  test("renders correctly", () => {
    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByText("Buyer")).toBeInTheDocument();
    expect(screen.getByText("Artist")).toBeInTheDocument();
  });

  test("handles name input change", () => {
    const nameInput = screen.getByLabelText("Full Name")as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });

  test("handles email input change", () => {

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput.value).toBe("john@example.com");
  });
  

  test("handles password input change", () => {
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  test("navigates to the next step", () => {
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    // After clicking Next, the component should move to the second step.
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  test("handles file upload", async () => {
    const fileInput = screen.getByLabelText("Profile Image");
    const file = new File(["dummy content"], "profile.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Mocking the image upload service to resolve successfully.
    (uploadImageToCloudinary as jest.Mock).mockResolvedValue("https://image-url.com");

    await waitFor(() => expect(uploadImageToCloudinary).toHaveBeenCalledTimes(1));
    expect(uploadImageToCloudinary).toHaveBeenCalledWith(file);
  });

  test("shows error if image size exceeds 5MB", () => {
    const fileInput = screen.getByLabelText("Profile Image");
    const largeFile = new File([new Array(6 * 1024 * 1024).join("a")], "large-profile.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(useToast().error).toHaveBeenCalledWith("Image size should be less than 5MB");
  });

  test("submits form successfully", async () => {
    // Set all required fields for submission
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "123456789" } });

    // Mock API response
    (apiClient.post as jest.Mock).mockResolvedValue({
      success: true,
      data: { token: "mock-token", id: "user-id", userType: "BUYER", name: "John Doe", profImg: "image-url" },
    });

    const createAccountButton = screen.getByText("Create Account");
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledTimes(1);
      expect(useToast().success).toHaveBeenCalledWith("Account created successfully!");
      expect(localStorage.setItem).toHaveBeenCalledWith("token", "mock-token");
    });
  });

  test("handles error on submission", async () => {
    // Set all required fields for submission
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "123456789" } });

    // Mock API failure
    (apiClient.post as jest.Mock).mockRejectedValue(new Error("Signup failed"));

    const createAccountButton = screen.getByText("Create Account");
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(useToast().error).toHaveBeenCalledWith("An error occurred during signup");
    });
  });

  test("closes modal when close button is clicked", () => {
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
