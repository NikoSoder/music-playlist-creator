import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Modal } from "@/components/Modal";
import { mockSongs } from "@/mocks/songs";

describe("Modal", () => {
  const props = {
    open: true,
    setIsOpenModal: vi.fn(),
    playlist: mockSongs,
    responseMessage: "Success",
  };

  it("renders Modal component", () => {
    render(<Modal {...props} />);
    expect(screen.getByRole("dialog")).toBeDefined();
    // genre 'Hip Hop' should be hidden behind +1 more button
    expect(screen.getByText("+1 more")).toBeDefined();
    expect(screen.queryByText("Hip Hop")).toBeNull();
  });

  it("shows all genres in that card when clicking +1 more button", () => {
    render(<Modal {...props} />);

    // check if 'Hip Hop' is hidden
    expect(screen.queryByText("Hip Hop")).toBeNull();
    // shows +1 more button
    expect(screen.getByText("+1 more")).toBeDefined();

    // click '+1 more' button
    fireEvent.click(screen.getByText("+1 more"));

    // shows 'Hip Hop' genre
    expect(screen.getByText("Hip Hop")).toBeDefined();
    // hides +1 more button
    expect(screen.queryByText("+1 more")).toBeNull();
  });

  it("shows 'No matching results' text if playlist is empty", () => {
    render(<Modal {...props} playlist={[]} />);
    expect(screen.getByText("No matching results")).toBeDefined();
    expect(screen.getByText("Try again with different tags")).toBeDefined();
  });
});
