import Button from "@/components/button/button";
import Input from "@/components/input/input";
import scss from "./createRoom.module.scss";
import { useForm } from "hxform";
import { CreateRoomProps } from "./createRoom.types";
import { CreateRoomTypes } from "@/types/createRoom";
import { useNavigate } from "react-router-dom";

function CreateRoom(props: CreateRoomProps) {
  const navigate = useNavigate();

  const form = useForm<CreateRoomTypes>({
    defaultValues: {
      room: "",
      username: "",
    },
    validation: (inputs, errors) => {
      if (inputs.room.length < 3 || inputs.room.length > 30) {
        errors.room = "Room's name must be between 3 and 30 characters long";
      }

      if (inputs.username.length < 3 || inputs.username.length > 30) {
        errors.username = "Username must be between 3 and 30 characters long";
      }
    },
    handleSubmit: (inputs) =>
      props.handleSubmit(inputs, (roomId) => navigate(`/room/${roomId}`)),
  });

  return (
    <form data-testid="form" className={scss.form} onSubmit={form.onSubmit}>
      <h1 className={scss.title}>Dev Planning</h1>
      <Input.Root hasError={!!form.errors?.username}>
        <Input.Input
          name="username"
          onChange={form.handleChange}
          disabled={form.isSubmitting}
          placeholder="Your best username!"
        />
      </Input.Root>
      <Input.Error errorMessage={form.errors?.username} />

      <Input.Root hasError={!!form.errors?.room}>
        <Input.Input
          name="room"
          onChange={form.handleChange}
          disabled={form.isSubmitting}
          placeholder="Your best room name!"
        />
      </Input.Root>
      <Input.Error errorMessage={form.errors?.room} />

      <Button
        fullScreen
        type="submit"
        disabled={form.isSubmitting}
        isLoading={form.isSubmitting}
      >
        Create Room
      </Button>
    </form>
  );
}

export default CreateRoom;
