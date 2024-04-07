import { render, screen } from "@testing-library/react";

import SignupForm from "./signUpForm";
import { axe } from "vitest-axe";
import userEvent from "@testing-library/user-event";

const makeSut = () => render(<SignupForm />);

describe("SignupForm", () => {
  describe("when initialize", () => {
    it("renders correctly", () => {
      makeSut();

      expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    });

    it("have no a11y violations", async () => {
      const { container } = makeSut();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("when focus in password input", () => {
    it("shows in screen the password guide", async () => {
      makeSut();
      const inputEl = screen.getByPlaceholderText(/secret password/i);

      userEvent.click(inputEl);

      const passwordGuideEl = screen.findByText(/lowercase/i);

      expect(await passwordGuideEl).toBeInTheDocument();
    });
  });

  describe("when type in username a value less than 6 or bigger than 30", () => {
    it("shows in the screen the validation message", async () => {
      makeSut();

      const inputEl = screen.getByPlaceholderText(/username/i);
      const btnEl = screen.getByRole("button", { name: /sign up/i });

      userEvent.type(inputEl, "a");
      userEvent.click(btnEl);

      const validationEl = screen.findByText(
        /username must be between 3 and 30 characters long/i,
      );

      expect(await validationEl).toBeInTheDocument();

      userEvent.type(inputEl, "a".repeat(30));
      userEvent.click(btnEl);

      expect(await validationEl).toBeInTheDocument();
    });
  });

  describe("when type in email a invalid value", () => {
    it("shows in the screen the validation message", async () => {
      makeSut();

      const inputEl = screen.getByPlaceholderText(/email/i);
      const btnEl = screen.getByRole("button", { name: /sign up/i });

      userEvent.type(inputEl, "invalid email");
      userEvent.click(btnEl);

      const validationEl = screen.findByText(/email not valid/i);

      expect(await validationEl).toBeInTheDocument();
    });
  });

  describe("when type in password a weak password", () => {
    it("shows in the screen the validation message", async () => {
      makeSut();

      const inputEl = screen.getByPlaceholderText(/secret password/i);
      const btnEl = screen.getByRole("button", { name: /sign up/i });

      userEvent.type(inputEl, "weak password");
      userEvent.click(btnEl);

      const validationEl = screen.findByText(
        /your password is not strong enough/i,
      );

      expect(await validationEl).toBeInTheDocument();
    });
  });

  describe("when type in password a value and a different value in confirm password", () => {
    it("shows in the screen the validation message", async () => {
      makeSut();

      const inputEl = screen.getByPlaceholderText(/secret password/i);
      const inputConfirmEl = screen.getByPlaceholderText(
        /confirm your password/i,
      );
      const btnEl = screen.getByRole("button", { name: /sign up/i });

      await userEvent.type(inputEl, "weak password");
      await userEvent.type(inputConfirmEl, "different weak password");
      userEvent.click(btnEl);

      const validationEl = await screen.findAllByText(
        /password must be equal to your password confirmation/i,
      );

      validationEl.map((element) => expect(element).toBeInTheDocument());
    });
  });
});
