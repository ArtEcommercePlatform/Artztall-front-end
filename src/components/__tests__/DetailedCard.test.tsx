
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailedCard from '../DetailedCard';
import { ShoppingCart, Expand } from 'lucide-react';

describe('DetailedCard Component', () => {
  const mockOnBuy = jest.fn();

  const props = {
    id: '1',
    name: 'Art Piece',
    description: 'A beautiful artwork',
    price: 10000,
    imageUrl: 'https://example.com/image.jpg',
    category: 'Painting',
    tags: ['art', 'modern', 'canvas'],
    medium: 'Oil on Canvas',
    style: 'Modern',
    dimensions: {
      length: 20,
      width: 15,
      unit: 'inches',
    },
    available: true,
    onBuy: mockOnBuy,
  };

  it('should render the DetailedCard component with provided props', () => {
    render(<DetailedCard {...props} />);
    
    expect(screen.getByText('Art Piece')).toBeInTheDocument();
    expect(screen.getByText('LKR 10,000')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Art Piece/i })).toBeInTheDocument();
  });

  // Add other test cases here...
});
