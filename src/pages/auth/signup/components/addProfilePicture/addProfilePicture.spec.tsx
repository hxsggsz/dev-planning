import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import { axe } from "vitest-axe";
import AddProfilePicture from "./addProfilePicture";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "@/context/toastContext/toastContext";

window.URL.createObjectURL = vi.fn();

const renderComponent = () =>
  render(
    <ToastProvider>
      <BrowserRouter>
        <AddProfilePicture />
      </BrowserRouter>
    </ToastProvider>,
  );

describe("AddProfilePicture", () => {
  describe("when initialize", () => {
    it("haves no a11y violations", async () => {
      const { container } = renderComponent();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("renders correctly", () => {
      renderComponent();

      expect(screen.getByText(/profile picture/i));
      expect(screen.getByText(/this is optional/i));
    });

    it("shows on screen all supported files", () => {
      renderComponent();

      expect(screen.getByText(/jpg/i)).toBeInTheDocument();
      expect(screen.getByText(/jpeg/i)).toBeInTheDocument();
      expect(screen.getByText(/png/i)).toBeInTheDocument();
      expect(screen.getByText(/webp/i)).toBeInTheDocument();
      expect(screen.getByText(/gif/i)).toBeInTheDocument();
    });

    it("shows on screen the image placeholder empty", () => {
      renderComponent();

      expect(screen.getByTestId(/image-placeholder/i)).toBeInTheDocument();
    });
  });

  describe("when select a file", () => {
    it("shows a error in screen if the file is not supported", async () => {
      renderComponent();

      const file = new File(["hello"], "hello.pdf", {
        type: "application/pdf",
      });
      const labelInput = screen.getByLabelText(/file input/i);

      userEvent.upload(labelInput, file);

      const errorEl = screen.findByText(/not supported/i);

      expect(await errorEl).toBeInTheDocument();
    });

    it("shows the file on screen if the file is supported", async () => {
      renderComponent();

      const file = new File(["hello"], "hello.png", { type: "image/png" });
      const labelInput = screen.getByLabelText(/file input/i);

      userEvent.upload(labelInput, file);

      const fileOnScreen = screen.findByAltText(/hello.png/i);

      expect(await fileOnScreen).toBeInTheDocument();
      expect(
        screen.queryByTestId(/image-placeholder/i),
      ).not.toBeInTheDocument();
      expect(window.URL.createObjectURL).toHaveBeenCalled();
    });

    it("shows the submit button in screen", async () => {
      renderComponent();

      const file = new File(["hello"], "hello.png", { type: "image/png" });
      const labelInput = screen.getByLabelText(/file input/i);

      userEvent.upload(labelInput, file);

      const uploadBtnEl = screen.findByRole("button", {
        name: "Upload profile picture",
      });

      expect(await uploadBtnEl).toBeInTheDocument();
    });
  });
});
