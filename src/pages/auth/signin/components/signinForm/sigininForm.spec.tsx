import { render, screen } from "@testing-library/react";

import { axe } from "vitest-axe";
import userEvent from "@testing-library/user-event";
import SignInForm from "./signinForm";
import { BrowserRouter } from "react-router-dom";

const renderComponent = () =>
  render(
    <BrowserRouter>
      <SignInForm />
    </BrowserRouter>,
  );

describe("SignupForm", () => {
  describe("when initialize", () => {
    it("renders correctly", () => {
      renderComponent();

      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    });

    it("have no a11y violations", async () => {
      const { container } = renderComponent();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("when type in email a invalid value", () => {
    it("shows in the screen the validation message", async () => {
      renderComponent();

      const inputEl = screen.getByPlaceholderText(/email/i);
      const btnEl = screen.getByRole("button", { name: /sign in/i });

      userEvent.type(inputEl, "invalid email");
      userEvent.click(btnEl);

      const validationEl = screen.findByText(/email not valid/i);

      expect(await validationEl).toBeInTheDocument();
    });
  });
});
