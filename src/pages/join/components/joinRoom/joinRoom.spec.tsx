import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateRoom from "./joinRoom";
import { CreateRoomProps } from "./joinRoom.types";

const makeSut = ({
  handleSubmit = () => {},
  ...props
}: Partial<CreateRoomProps>) =>
  render(
    <BrowserRouter>
      <CreateRoom handleSubmit={handleSubmit} {...props} />
    </BrowserRouter>,
  );

describe("CreateRoom", () => {
  describe("when initialize", () => {
    it("renders correctly", () => {
      makeSut({});
      const usernameInputEl = screen.getByPlaceholderText(/username/i);
      const roomInputEl = screen.getByPlaceholderText(/room/i);
      const buttonEl = screen.getByRole("button", { name: /create room/i });

      expect(usernameInputEl).toBeInTheDocument();
      expect(roomInputEl).toBeInTheDocument();
      expect(buttonEl).toBeInTheDocument();
    });
  });

  describe("when write in the username input ", () => {
    it("updates the input value", async () => {
      makeSut({});

      const usernameInputEl = screen.getByPlaceholderText(
        /username/i,
      ) as HTMLInputElement;

      expect(usernameInputEl.value).toBe("");

      fireEvent.change(usernameInputEl, {
        target: { value: "test" },
      });

      await waitFor(() => expect(usernameInputEl.value).toBe("test"));
    });

    describe("when submit", () => {
      it("shows an error if input value is less than 3", async () => {
        makeSut({});

        const formEl = screen.getByTestId("form");
        const usernameInputEl = screen.getByPlaceholderText(/username/i);

        fireEvent.change(usernameInputEl, {
          target: { value: "a" },
        });

        fireEvent.submit(formEl);

        const errorEl = screen.findByText(
          /Username must be between 3 and 30 characters long/i,
        );
        expect(await errorEl).toBeInTheDocument();
      });

      it("shows an error if input value is more than 30", async () => {
        makeSut({});

        const formEl = screen.getByTestId("form");
        const usernameInputEl = screen.getByPlaceholderText(/username/i);

        fireEvent.change(usernameInputEl, {
          target: { value: "a".repeat(32) },
        });
        fireEvent.submit(formEl);

        const errorEl = screen.findByText(
          /Username must be between 3 and 30 characters long/i,
        );
        expect(await errorEl).toBeInTheDocument();
      });
    });
  });

  describe("when write in the room input ", () => {
    it("updates the input value", async () => {
      makeSut({});

      const roomInputEl = screen.getByPlaceholderText(
        /room/i,
      ) as HTMLInputElement;

      expect(roomInputEl.value).toBe("");

      fireEvent.change(roomInputEl, { target: { value: "test" } });

      await waitFor(() => expect(roomInputEl.value).toBe("test"));
    });

    describe("when submit", () => {
      it("shows an error if input value is less than 3", async () => {
        makeSut({});

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
        makeSut({});

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

  it("calls the submit function when pass the valdiation", async () => {
    const mockSubmit = vi.fn();
    makeSut({ handleSubmit: mockSubmit });

    const formEl = screen.getByTestId("form");
    const roomInputEl = screen.getByPlaceholderText(/room/i);
    const usernameInputEl = screen.getByPlaceholderText(/username/i);

    fireEvent.change(roomInputEl, { target: { value: "test" } });
    fireEvent.change(usernameInputEl, { target: { value: "test" } });
    fireEvent.submit(formEl);

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
  });
});
