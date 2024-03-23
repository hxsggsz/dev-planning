import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { Envelope, Password, UserCircle } from "@phosphor-icons/react";
import scss from "./signupForm.module.scss";

function SignUpForm() {
  return (
    <form className={scss.wrapper}>
      <Input.Root>
        <UserCircle size={32} />
        <Input.Input placeholder="Your best username" />
      </Input.Root>
      <Input.Error errorMessage="" />

      <Input.Root>
        <Envelope size={32} />
        <Input.Input placeholder="Your best email" />
      </Input.Root>
      <Input.Error errorMessage="" />

      <Input.Root>
        <Password size={32} />
        <Input.Input isSecret placeholder="Your secret password" />
      </Input.Root>
      <Input.Error errorMessage="" />

      <Input.Root>
        <Password size={32} />
        <Input.Input isSecret placeholder="Confirm you password" />
      </Input.Root>
      <Input.Error errorMessage="" />

      <Button type="submit" fullScreen>
        Submit
      </Button>
    </form>
  );
}

export default SignUpForm;
