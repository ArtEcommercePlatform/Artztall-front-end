import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { MemoryRouter } from 'react-router-dom';
import Hero from '../components/Hero'; // Adjust import path as needed

// Improved typing for framer-motion mock
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
      <div {...props}>{children}</div>
    )
  }
}));

// Helper function to render the Hero component with MemoryRouter
const renderHeroComponent = () => {
  return render(
    <MemoryRouter future={{ v7_startTransition: true }}>
      <Hero />
    </MemoryRouter>
  );
};

describe('Hero Component', () => {
  // Test that the component renders without crashing
  test('renders hero component successfully', () => {
    renderHeroComponent();
    
    // Check for key text elements
    expect(screen.getByText('Discover Unique Artworks')).toBeInTheDocument();
    expect(screen.getByText(/Support independent artists/i)).toBeInTheDocument();
  });

  // Test the presence of buttons
  test('renders both "Shop Now" and "Learn More" buttons', () => {
    renderHeroComponent();
    
    const shopNowButton = screen.getByText('Shop Now');
    const learnMoreButton = screen.getByText('Learn More');
    
    expect(shopNowButton).toBeInTheDocument();
    expect(learnMoreButton).toBeInTheDocument();
  });

  // Test the "Shop Now" button's routing
  test('Shop Now button links to /shop', () => {
    renderHeroComponent();
    
    const shopNowButton = screen.getByText('Shop Now');
    expect(shopNowButton.closest('a')).toHaveAttribute('href', '/shop');
  });

  // Test background image and overlay
  test('renders background image and overlay', () => {
    renderHeroComponent();
    
    // Check for background image container
    const backgroundDiv = document.querySelector('.bg-center.bg-cover');
    expect(backgroundDiv).toBeInTheDocument();

    // Verify background image style using computed styles
    if (backgroundDiv) {
      const computedStyle = window.getComputedStyle(backgroundDiv);
      const backgroundImage = computedStyle.getPropertyValue('background-image');
      
      expect(backgroundImage).toContain('https://c0.wallpaperflare.com/preview/807/214/326/4k-wallpaper-abstract-expressionism-abstract-painting-acrylic-paint.jpg');
    }

    // Check for black overlay
    const overlayDiv = document.querySelector('.bg-black\\/50');
    expect(overlayDiv).toBeInTheDocument();
  });

  // Test responsive typography
  test('has responsive typography classes', () => {
    renderHeroComponent();
    
    const mainHeading = screen.getByText('Discover Unique Artworks');
    expect(mainHeading).toHaveClass('text-5xl', 'lg:text-7xl');
    
    const subHeading = screen.getByText(/Support independent artists/i);
    expect(subHeading).toHaveClass('text-xl', 'lg:text-2xl');
  });

  // Test the overall layout and styling
  test('has correct layout and styling classes', () => {
    renderHeroComponent();
    
    const heroContainer = document.querySelector('.min-h-screen.bg-emerald-900');
    expect(heroContainer).toBeInTheDocument();
    
    const contentContainer = screen.getByText('Discover Unique Artworks').closest('div');
    expect(contentContainer).toHaveClass('text-center', 'max-w-7xl');
  });
});