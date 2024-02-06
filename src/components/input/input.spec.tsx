import { render, screen } from "@testing-library/react";

import Input from "./input";

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
});
