import Button from "@/components/button/button";
import Input from "@/components/input/input";
import scss from "./createRoom.module.scss";
import { useForm } from "hxform";
import { CreateRoomTypes } from "@/types/createRoom";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/context/toastContext/useToast";
import { useCreateRoom } from "@/stores/useCreateRoom/useCreateRoom";
import { useUser } from "@/stores/useUserStore/useUserStore";
import Switch from "@/components/switch/switch";

function CreateRoom() {
  const { toast } = useToast();

  const navigate = useNavigate();

  const userId = useUser((state) => state.user)?.id;

  const createRoom = useCreateRoom((state) => state.createRoom);
  const createRoomMutation = createRoom(
    (roomId) => {
      toast.success("Room created successfully, you will be redirect soon");
      navigate(`/room/${roomId}`);
    },
    (errorMessage) => {
      toast.error(errorMessage);
    },
  );

  const form = useForm<CreateRoomTypes>({
    defaultValues: {
      room: "",
      isPublic: true,
    },
    validation: (inputs, errors) => {
      if (inputs.room.length < 3 || inputs.room.length > 30) {
        errors.room = "Room's name must be between 3 and 30 characters long";
      }
    },
    handleSubmit: (inputs) =>
      createRoomMutation({ ...inputs, userId: userId ?? "" }),
  });

  return (
    <form data-testid="form" className={scss.form} onSubmit={form.onSubmit}>
      <h1 className={scss.title}>Dev Planning</h1>
      <Input.Root hasError={!!form.errors?.room}>
        <Input.Input
          name="room"
          onChange={form.handleChange}
          disabled={form.isSubmitting}
          placeholder="Your best room name..."
        />
      </Input.Root>
      <Input.Error errorMessage={form.errors?.room} />

      <label className={scss.switchLabel}>
        <p>Is Room public?</p>
        <Switch
          name="isPublic"
          onChange={form.handleChange}
          checked={form.inputs.isPublic}
        />
      </label>
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
