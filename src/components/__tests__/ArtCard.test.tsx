
import { render, screen, fireEvent } from "@testing-library/react";
import ArtCard from "../ArtCard";

//  props
const mockProps = {
  image: "test-image.jpg",
  artName: "Test Art",
  artistName: "Test Artist",
  price: "$1000",
  medium: "Oil on Canvas",
  framed: "Yes",
  orientation: "Landscape",
  artStyle: "Modern",
};

describe("ArtCard Component", () => {
  test("renders all props correctly", () => {
    render(<ArtCard {...mockProps} />);

    // Check if basic props are rendered
    expect(screen.getByAltText(mockProps.artName)).toBeInTheDocument();
    expect(screen.getByText(mockProps.artName)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price)).toBeInTheDocument();
  });

  test("hovering over the image scales it and shows medium", () => {
    render(<ArtCard {...mockProps} />);

    const imageContainer = screen.getByAltText(mockProps.artName).parentElement;

    // imageContainer is not null before firing events
    if (imageContainer) {
      fireEvent.mouseEnter(imageContainer);

      // medium is displayed
      expect(screen.getByText(mockProps.medium)).toBeInTheDocument();

      fireEvent.mouseLeave(imageContainer);

      // medium is hidden again
      expect(screen.queryByText(mockProps.medium)).not.toBeInTheDocument();
    }
  });

  test("clicking the toggle button expands/collapses additional details", () => {
    render(<ArtCard {...mockProps} />);

    const toggleButton = screen.getByRole("button");

    // Initially, expanded details should not be visible
    expect(screen.queryByText(`Artist: ${mockProps.artistName}`)).not.toBeInTheDocument();

   

    
    fireEvent.click(toggleButton);
    expect(screen.queryByText(`Artist: ${mockProps.artistName}`)).not.toBeInTheDocument();
  });

  test("image has correct src and alt attributes", () => {
    render(<ArtCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.artName) as HTMLImageElement;
    expect(image.src).toContain(mockProps.image);
    expect(image.alt).toBe(mockProps.artName);
  });

  test("arrow icon toggles correctly", () => {
    render(<ArtCard {...mockProps} />);

    const toggleButton = screen.getByRole("button");

    // Initially shows "keyboard_arrow_up"
    expect(screen.getByText("keyboard_arrow_up")).toBeInTheDocument();

    // Click to expand
    fireEvent.click(toggleButton);
    expect(screen.getByText("keyboard_arrow_down")).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(toggleButton);
    expect(screen.getByText("keyboard_arrow_up")).toBeInTheDocument();
  });
});
