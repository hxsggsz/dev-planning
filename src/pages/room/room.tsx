import { useToast } from "@/context/toastContext/useToast";
import { useUser } from "@/stores/useUserStore/useUserStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Room() {
  const { roomId } = useParams();

  const { toast } = useToast();

  const navigate = useNavigate();

  const updateUser = useUser((state) => state.updateUser);

  useEffect(() => {
    updateUser(roomId ?? "", (errorMessage) => {
      toast.error(errorMessage);
      navigate("join");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <h1>teste</h1>
    </main>
  );
}

export default Room;
