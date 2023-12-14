import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Tags from "@/components/Tags";

describe("Tags", () => {
  const props = {
    activeTags: ["Tag1", "Tag2"],
    handleRemoveFromActiveTags: vi.fn(),
    clearAllActiveTags: vi.fn(),
  };

  it("renders Tags component with active tags", () => {
    render(<Tags {...props} />);

    // Check if the tags are rendered
    expect(screen.getByText("Tag1")).toBeDefined();
    expect(screen.getByText("Tag2")).toBeDefined();

    // Check if the clear all button is present
    expect(screen.getByText("Clear all")).toBeDefined();
  });

  it("calls handleRemoveFromActiveTags when tag is clicked", () => {
    render(<Tags {...props} />);

    fireEvent.click(screen.getByText("Tag1"));

    // Check if handleRemoveFromActiveTags is called with the correct argument
    expect(props.handleRemoveFromActiveTags).toHaveBeenCalledWith("Tag1");
  });

  it("calls clearAllActiveTags when 'Clear all' button is clicked", () => {
    render(<Tags {...props} />);

    fireEvent.click(screen.getByText("Clear all"));

    // Check if clearAllActiveTags is called
    expect(props.clearAllActiveTags).toHaveBeenCalled();
  });
});
