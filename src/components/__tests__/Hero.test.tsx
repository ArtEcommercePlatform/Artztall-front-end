import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "../Hero";import "@testing-library/jest-dom"; 
import { BrowserRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";

// Mock the motion component as a simple div for testing purposes
jest.mock("framer-motion", () => {
  const actualModule = jest.requireActual("framer-motion");
  return {
    ...actualModule,
    motion: jest.fn().mockImplementation((props) => <div {...props} />),
  };
});

describe("Hero component", () => {
  test("renders the Hero component with correct content", () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    // Check if the main heading is present
    expect(
      screen.getByText(/discover unique artworks/i)
    ).toBeInTheDocument();

    // Check if the subheading is present
    expect(
      screen.getByText(/support independent artists and find your perfect piece that speaks to your soul./i)
    ).toBeInTheDocument();

    // Check if the "Shop Now" button is rendered
    expect(screen.getByRole("button", { name: /shop now/i })).toBeInTheDocument();

    // Check if the "Learn More" button is rendered
    expect(screen.getByRole("button", { name: /learn more/i })).toBeInTheDocument();
  });

  test("navigates to /shop when the 'Shop Now' button is clicked", () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    // Mocking the navigation functionality
    const shopNowButton = screen.getByRole("button", { name: /shop now/i });
    expect(shopNowButton).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(shopNowButton);

    // Assuming that clicking the button navigates to the /shop route
    // In a full test suite, you could use a library like `@testing-library/react-router` to confirm navigation.
    expect(window.location.pathname).toBe("/shop");
  });

  test("button styles are applied correctly", () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    // Check if the "Shop Now" button has the correct styles
    const shopNowButton = screen.getByRole("button", { name: /shop now/i });
    expect(shopNowButton).toHaveClass("bg-white", "text-emerald-900", "rounded-full");

    // Check if the "Learn More" button has the correct styles
    const learnMoreButton = screen.getByRole("button", { name: /learn more/i });
    expect(learnMoreButton).toHaveClass("border-2", "border-white", "rounded-full");
  });

  test("content fades in and animates on mount", () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    // Check for the presence of animations
    expect(screen.getByText(/discover unique artworks/i)).toHaveStyle("opacity: 1;");
    expect(screen.getByText(/support independent artists and find your perfect piece that speaks to your soul./i)).toHaveStyle("opacity: 1;");

    // Check if the buttons are visible and have the correct animation applied
    const shopNowButton = screen.getByRole("button", { name: /shop now/i });
    const learnMoreButton = screen.getByRole("button", { name: /learn more/i });

    expect(shopNowButton).toBeVisible();
    expect(learnMoreButton).toBeVisible();
  });
});
