import { render, screen, waitFor } from "@testing-library/react";

import Input from "./input";
import userEvent from "@testing-library/user-event";

describe("input", () => {
  describe("when initialize", () => {
    describe("when error message is empty", () => {
      it("doesnt renders the error message", () => {
        render(<Input.Error errorMessage="" />);
        expect(screen.queryByTestId("error")).not.toBeInTheDocument();
      });
    });

    describe("when has error message", () => {
      it("renders the error message", () => {
        render(<Input.Error errorMessage="error" />);
        expect(screen.getByText("error")).toBeVisible();
      });
    });
  });

  describe("when input is a password", () => {
    it("can toggle betwen show and hide password", async () => {
      render(<Input.Input isSecret placeholder="test" />);
      const inputEl = screen.getByPlaceholderText(/test/i) as HTMLInputElement;
      const toggleBtnEl = screen.getByTestId(/toggle-button/i);

      expect(inputEl.type).toEqual("password");

      userEvent.click(toggleBtnEl);

      await waitFor(() => expect(inputEl.type).toEqual("text"));
    });
  });
});
