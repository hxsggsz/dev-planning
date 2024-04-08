import { render, screen } from "@testing-library/react";
import * as useToast from "@/stores/useToast/useToast";
import Toast from "./toast";
import { Warning } from "@phosphor-icons/react";

describe("Toast", () => {
  const useToastMock = vi.spyOn(useToast, "useToast");

  describe("when initialize", () => {
    it("doesnt render any component correctly", () => {
      render(<Toast />);

      expect(screen.queryByTestId(/toast/i)).not.toBeInTheDocument();
    });
  });

  describe("when has value in useToast store", () => {
    it("shows toast on screen", () => {
      useToastMock.mockReturnValue({
        toastContent: {
          content: "mock toast content",
          variant: "warning",
          icon: Warning,
        },
      });
      render(<Toast />);

      const toastEl = screen.getByText(/mock toast content/i);

      expect(toastEl).toBeInTheDocument();
    });

    it("hiddes toast after 3500ms", async () => {
      useToastMock.mockReturnValue({
        toastContent: {
          content: "mock toast content",
          variant: "warning",
          icon: Warning,
        },
      });
      render(<Toast />);

      const toastEl = screen.findByText(/mock toast content/i);

      expect(await toastEl).toBeInTheDocument();

      setTimeout(
        async () => expect(await toastEl).not.toBeInTheDocument(),
        3500,
      );
    });
  });
});
