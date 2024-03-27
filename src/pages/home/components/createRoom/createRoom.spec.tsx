import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateRoom from "./createRoom";

const renderComponent = () =>
  render(
    <BrowserRouter>
      <CreateRoom />
    </BrowserRouter>,
  );

describe("CreateRoom", () => {
  describe("when initialize", () => {
    it("renders correctly", () => {
      renderComponent();

      const roomInputEl = screen.getByPlaceholderText(/room/i);
      const buttonEl = screen.getByRole("button", { name: /create room/i });

      expect(roomInputEl).toBeInTheDocument();
      expect(buttonEl).toBeInTheDocument();
    });
  });

  describe("when write in the room input ", () => {
    it("updates the input value", async () => {
      renderComponent();

      const roomInputEl = screen.getByPlaceholderText(
        /room/i,
      ) as HTMLInputElement;

      expect(roomInputEl.value).toBe("");

      fireEvent.change(roomInputEl, { target: { value: "test" } });

      await waitFor(() => expect(roomInputEl.value).toBe("test"));
    });

    describe("when submit", () => {
      it("shows an error if input value is less than 3", async () => {
        renderComponent();

        const formEl = screen.getByTestId("form");
        const roomInputEl = screen.getByPlaceholderText(/room/i);

        fireEvent.change(roomInputEl, { target: { value: "a" } });
        fireEvent.submit(formEl);

        const errorEl = screen.findByText(
          /room's name must be between 3 and 30 characters long/i,
        );
        expect(await errorEl).toBeInTheDocument();
      });

      it("shows an error if input value is more than 30", async () => {
        renderComponent();

        const formEl = screen.getByTestId("form");
        const roomInputEl = screen.getByPlaceholderText(/room/i);

        fireEvent.change(roomInputEl, { target: { value: "a".repeat(32) } });
        fireEvent.submit(formEl);

        const errorEl = screen.findByText(
          /room's name must be between 3 and 30 characters long/i,
        );
        expect(await errorEl).toBeInTheDocument();
      });
    });
  });
});
