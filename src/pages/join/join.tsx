import { useToast } from "@/context/toastContext/useToast";
import JoinRoom from "./components/joinRoom/joinRoom";
import { useEffect } from "react";

function Join() {
  const { toast } = useToast();

  useEffect(() => {
    toast.warning("deu ruim paizao");
  }, []);

  return (
    <main>
      <JoinRoom handleSubmit={() => {}} />
    </main>
  );
}

export default Join;
