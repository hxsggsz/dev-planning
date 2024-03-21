import { ToastContext, ToastProvider } from "./toastContext";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

describe("testing the ToastContext", () => {
  describe("when renders the context", () => {
    it("doesnt show the toast", () => {
      render(
        <ToastProvider>
          <ToastContext.Consumer>
            {({ toast }) => (
              <button
                onClick={() => {
                  toast.warning("test");
                }}
              >
                test toast
              </button>
            )}
          </ToastContext.Consumer>
        </ToastProvider>,
      );
      expect(screen.queryByText("test")).not.toBeInTheDocument();
    });
  });

  describe("when calls the warning toast", () => {
    it("shows on screen the warning toast", async () => {
      render(
        <ToastProvider>
          <ToastContext.Consumer>
            {({ toast }) => (
              <button
                onClick={() => {
                  toast.warning("test");
                }}
              >
                test toast
              </button>
            )}
          </ToastContext.Consumer>
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "test toast" }));
      await waitFor(() => expect(screen.getByText("test")).toBeInTheDocument());
    });
  });

  describe("when calls the info toast", () => {
    it("shows on screen the info toast", async () => {
      render(
        <ToastProvider>
          <ToastContext.Consumer>
            {({ toast }) => (
              <button
                onClick={() => {
                  toast.info("test");
                }}
              >
                test toast
              </button>
            )}
          </ToastContext.Consumer>
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "test toast" }));
      await waitFor(() => expect(screen.getByText("test")).toBeInTheDocument());
      expect(screen.getByText("test")).toHaveStyle("background: main-bg;");
    });
  });

  describe("when calls the success toast", () => {
    it("shows on screen the success toast", async () => {
      render(
        <ToastProvider>
          <ToastContext.Consumer>
            {({ toast }) => (
              <button
                onClick={() => {
                  toast.success("test");
                }}
              >
                test toast
              </button>
            )}
          </ToastContext.Consumer>
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "test toast" }));
      await waitFor(() => expect(screen.getByText("test")).toBeInTheDocument());
    });
  });

  describe("when calls the error toast", () => {
    it("shows on screen the error toast", async () => {
      render(
        <ToastProvider>
          <ToastContext.Consumer>
            {({ toast }) => (
              <button
                onClick={() => {
                  toast.error("test");
                }}
              >
                test toast
              </button>
            )}
          </ToastContext.Consumer>
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "test toast" }));
      await waitFor(() => expect(screen.getByText("test")).toBeInTheDocument());
    });
  });

  describe("hiddes the toast", () => {
    it("after 3500 miliseconds if dont pass to the timer before", async () => {
      render(
        <ToastProvider>
          <ToastContext.Consumer>
            {({ toast }) => (
              <button
                onClick={() => {
                  toast.warning("test");
                }}
              >
                test toast
              </button>
            )}
          </ToastContext.Consumer>
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "test toast" }));
      await waitFor(() => expect(screen.getByText("test")).toBeInTheDocument());

      setTimeout(() => {
        expect(screen.queryByText("test")).not.toBeInTheDocument();
      }, 3500);
    });

    it("after the miliseconds that was passed to the context provider", async () => {
      render(
        <ToastProvider exitTimer={2000}>
          <ToastContext.Consumer>
            {({ toast }) => (
              <button
                onClick={() => {
                  toast.warning("test");
                }}
              >
                test toast
              </button>
            )}
          </ToastContext.Consumer>
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "test toast" }));
      await waitFor(() => expect(screen.getByText("test")).toBeInTheDocument());

      setTimeout(() => {
        expect(screen.queryByText("test")).not.toBeInTheDocument();
      }, 2000);
    });

    it("after the miliseconds that was passed to the toast function", async () => {
      render(
        <ToastProvider>
          <ToastContext.Consumer>
            {({ toast }) => (
              <button
                onClick={() => {
                  toast.warning("test", 2000);
                }}
              >
                test toast
              </button>
            )}
          </ToastContext.Consumer>
        </ToastProvider>,
      );

      fireEvent.click(screen.getByRole("button", { name: "test toast" }));
      await waitFor(() => expect(screen.getByText("test")).toBeInTheDocument());

      setTimeout(() => {
        expect(screen.queryByText("test")).not.toBeInTheDocument();
      }, 2000);
    });
  });
});
