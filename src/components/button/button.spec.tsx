import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { X } from "@phosphor-icons/react";
import Button from "./button";

describe("Button", () => {
  describe("when initialize", () => {
    it("renders everithing correctly", () => {
      render(<Button>test</Button>);
      const btn = screen.getByRole("button", { name: "test" });
      expect(btn).toBeVisible();
    });

    it("should not have basic accessibility issues", async () => {
      const { container } = render(<Button>test</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("when loading is true", () => {
    it("shows the loading icon on screen", async () => {
      render(<Button isLoading>test</Button>);

      const loadingElement = screen.getByTestId(/loading/i);
      expect(loadingElement).toBeVisible();
    });
  });

  describe("when button is asChild", () => {
    it("renders as child HTML element", () => {
      render(
        <Button asChild>
          <a href="/">test</a>
        </Button>,
      );

      const childElement = screen.getByRole("link", { name: "test" });

      expect(childElement).toBeVisible();
    });
  });

  describe("when pass a icon to component", () => {
    it("renders the icon together with the test", () => {
      render(
        <Button icon={<X data-testid="icon" />}>
          <a href="/">test</a>
        </Button>,
      );

      const textElement = screen.getByText(/test/i);
      const iconElement = screen.getByTestId(/icon/i);

      expect(textElement).toBeVisible();
      expect(iconElement).toBeVisible();
    });
  });

  describe("when click", () => {
    it("calls the onClick function", async () => {
      const mockFunc = vi.fn();
      render(<Button onClick={mockFunc}>test</Button>);

      const btn = screen.getByRole("button", { name: "test" });
      userEvent.click(btn);

      await waitFor(() => {
        expect(mockFunc).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when button is disabled", () => {
    it("has the correctly aria-disabled value", () => {
      render(<Button disabled>test</Button>);
      const btn = screen.getByRole("button", { name: "test" });
      expect(btn).toBeDisabled();
    });
  });
});
