import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import GalleryError from "./error";

describe("GalleryError", () => {
  it("retries the failed render on request", async () => {
    const reset = vi.fn();
    render(<GalleryError error={new Error("boom")} reset={reset} />);

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(reset).toHaveBeenCalledOnce();
  });

  it("offers a way out when retrying will not help", () => {
    render(<GalleryError error={new Error("boom")} reset={vi.fn()} />);

    expect(
      screen.getByRole("link", { name: "Back to the gallery" }),
    ).toHaveAttribute("href", "/");
  });
});
