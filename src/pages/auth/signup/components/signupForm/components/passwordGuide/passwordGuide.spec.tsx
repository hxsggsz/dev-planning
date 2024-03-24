import { render, screen } from "@testing-library/react";

import PasswordGuide from "./passwordGuide";
import { PasswordGuideProps } from "./passwordGuide.type";

const makeSut = ({
  shouldShow = true,
  password = "",
  ...props
}: Partial<PasswordGuideProps>) =>
  render(
    <PasswordGuide shouldShow={shouldShow} password={password} {...props} />,
  );

describe("PasswordGuide", () => {
  describe("when initialize", () => {
    it("renders the guides correctly", () => {
      makeSut({});

      expect(screen.getByText(/lowercase/i)).toBeInTheDocument();
      expect(screen.getByText(/uppercase/i)).toBeInTheDocument();
      expect(screen.getByText(/number/i)).toBeInTheDocument();
      expect(screen.getByText(/special/i)).toBeInTheDocument();
    });
  });

  describe("when shouldShow is === false", () => {
    it("doesnt shows on screen the guides", () => {
      makeSut({ shouldShow: false });

      expect(screen.queryByText(/lowercase/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/uppercase/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/number/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/special/i)).not.toBeInTheDocument();
    });
  });

  describe("if password contains a lowercase letter", () => {
    it("lowercase guide must be green", () => {
      makeSut({ password: "test" });

      const lowerEl = screen.getByText(/lowercase/i);

      expect(lowerEl).toHaveClass("green");
      expect(lowerEl).not.toHaveClass("red");
    });
  });

  describe("if password contains a uppercase letter", () => {
    it("uppercase guide must be green", () => {
      makeSut({ password: "Test" });

      const upperEl = screen.getByText(/uppercase/i);

      expect(upperEl).toHaveClass("green");
      expect(upperEl).not.toHaveClass("red");
    });
  });

  describe("if password contains a number letter", () => {
    it("number guide must be green", () => {
      makeSut({ password: "test2" });

      const numberEl = screen.getByText(/number/i);

      expect(numberEl).toHaveClass("green");
      expect(numberEl).not.toHaveClass("red");
    });
  });

  describe("if password contains a special character letter", () => {
    it("special character guide must be green", () => {
      makeSut({ password: "test@" });

      const specialEl = screen.getByText(/special/i);

      expect(specialEl).toHaveClass("green");
      expect(specialEl).not.toHaveClass("red");
    });
  });
});
