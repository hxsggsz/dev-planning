import Button from "@/components/button/button";
import Input from "@/components/input/input";
import scss from "./joinRoom.module.scss";
import { useForm } from "hxform";
import { CreateRoomTypes } from "@/types/createRoom";
import { useNavigate, useParams } from "react-router-dom";
import { useJoinRoom } from "@/stores/useJoinRoom/useJoinRoom";
import { useToast } from "@/stores/useToast/useToast";

function JoinRoom() {
  const { roomId } = useParams();

  const toast = useToast();

  const navigate = useNavigate();

  const joinRoom = useJoinRoom((state) => state.joinRoom);
  const joinRoomMutation = joinRoom(
    (roomId) => {
      navigate(`/room/${roomId}`);
      toast.success("Success, you're joining the room");
    },
    (errorMessage) => toast.error(errorMessage),
  );

  const form = useForm<Pick<CreateRoomTypes, "username">>({
    defaultValues: {
      username: "",
    },
    validation: (inputs, errors) => {
      if (inputs.username.length < 3 || inputs.username.length > 30) {
        errors.username =
          "username's name must be between 3 and 30 characters long";
      }
    },
    handleSubmit: (inputs) =>
      joinRoomMutation({ username: inputs.username, roomId: roomId ?? "" }),
  });

  return (
    <form data-testid="form" className={scss.form} onSubmit={form.onSubmit}>
      <h1 className={scss.title}>Dev Planning</h1>
      <Input.Root hasError={!!form.errors?.username}>
        <Input.Input
          name="username"
          onChange={form.handleChange}
          disabled={form.isSubmitting}
          placeholder="Your best username..."
        />
      </Input.Root>
      <Input.Error errorMessage={form.errors?.username} />

      <Button
        fullScreen
        type="submit"
        disabled={form.isSubmitting}
        isLoading={form.isSubmitting}
      >
        Join the Room
      </Button>
    </form>
  );
}

export default JoinRoom;
