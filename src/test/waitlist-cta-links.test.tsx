import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Index from "@/pages/Index";

describe("waitlist CTAs", () => {
  it("renders all Join Waitlist CTAs as waitlist anchors", () => {
    render(<Index />);

    const waitlistButtons = screen.getAllByRole("link", { name: "Join Waitlist" });
    expect(waitlistButtons).toHaveLength(4);

    for (const cta of waitlistButtons) {
      expect(cta).toHaveAttribute("href", "#waitlist");
    }

    const finalCtaHeading = screen.getByRole("heading", {
      name: /ready to prototype like the future\?/i,
    });
    const finalCtaSection = finalCtaHeading.closest("section");
    expect(finalCtaSection).toHaveAttribute("id", "waitlist");

    const finalCtaLink = within(finalCtaSection as HTMLElement).getByRole("link", {
      name: "Join Waitlist",
    });
    expect(finalCtaLink).toHaveAttribute("href", "#waitlist");
  });
});
