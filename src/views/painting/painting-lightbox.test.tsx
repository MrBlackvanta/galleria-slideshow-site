import { paintings } from "@/data";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PaintingLightbox from "./painting-lightbox";

const { name, gallery } = paintings[0];

function renderLightbox() {
  render(<PaintingLightbox name={name} image={gallery} />);

  return {
    trigger: screen.getByRole("button", { name: "View image" }),
    dialog: screen.getByRole("dialog", { hidden: true }),
  };
}

describe("PaintingLightbox", () => {
  it("keeps the full size image out of reach until it is asked for", () => {
    const { dialog } = renderLightbox();

    expect(dialog).not.toHaveAttribute("open");
    expect(screen.getByAltText(`${name}, full size`)).toHaveAttribute(
      "src",
      gallery.src,
    );
  });

  it("opens the image as a modal and closes it again", async () => {
    const user = userEvent.setup();
    const { trigger, dialog } = renderLightbox();

    await user.click(trigger);

    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveAccessibleName(name);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(dialog).not.toHaveAttribute("open");
  });

  it("dismisses on a click beside the painting but not on the painting", async () => {
    const user = userEvent.setup();
    const { trigger, dialog } = renderLightbox();

    await user.click(trigger);
    await user.click(screen.getByAltText(`${name}, full size`));

    expect(dialog).toHaveAttribute("open");

    await user.click(dialog);

    expect(dialog).not.toHaveAttribute("open");
  });

  it("reserves the image's own size so opening it cannot reflow", () => {
    renderLightbox();

    const image = screen.getByAltText(`${name}, full size`);

    expect(image).toHaveAttribute("width", String(gallery.width));
    expect(image).toHaveAttribute("height", String(gallery.height));
  });
});
