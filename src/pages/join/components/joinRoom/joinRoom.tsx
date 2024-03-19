import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useForm } from "hxform";
import { useNavigate } from "react-router-dom";
import scss from "./joinRoom.module.scss";
import { JoinRoomProps, JoinRoomTypes } from "./joinRoom.types";

function JoinRoom(props: JoinRoomProps) {
  const navigate = useNavigate();

  const form = useForm<JoinRoomTypes>({
    defaultValues: {
      username: "",
    },
    validation: (inputs, errors) => {
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

export default JoinRoom;
