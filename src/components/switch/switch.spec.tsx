import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Switch from "./switch";
import { axe } from "vitest-axe";

describe("Switch", () => {
  describe("when initialize", () => {
    it("renders the switch off when checked={false}", () => {
      render(<Switch checked={false} setChecked={() => {}} />);

      const switchComponent = screen.getByRole("switch");

      expect(switchComponent).not.toBeChecked();
      expect(switchComponent).toBeInTheDocument();
    });

    it("renders the switch on when checked={true}", () => {
      render(<Switch checked={true} setChecked={() => {}} />);

      const switchComponent = screen.getByRole("switch");

      expect(switchComponent).toBeChecked();
      expect(switchComponent).toBeInTheDocument();
    });

    it("should not have basic accessibility issues", async () => {
      const { container } = render(
        <Switch checked={true} setChecked={() => {}} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("when click", () => {
    it("calls the setChecked function", async () => {
      const setCheckedMock = vi.fn();
      render(<Switch checked={true} setChecked={setCheckedMock} />);

      const switchComponent = screen.getByRole("switch");
      userEvent.click(switchComponent);

      await waitFor(() => expect(setCheckedMock).toHaveBeenCalledTimes(1));
    });
  });
});
