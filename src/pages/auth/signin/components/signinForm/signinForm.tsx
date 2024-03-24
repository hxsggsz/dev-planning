import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { SignUpTypes } from "@/types/auth";
import { Envelope, Password } from "@phosphor-icons/react";
import { useForm } from "hxform";
import scss from "./signinForm.module.scss";
import { useUser } from "@/stores/useUserStore/useUserStore";
import { useToast } from "@/context/toastContext/useToast";
import { Link, useNavigate } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();

  const { toast } = useToast();

  const authMutations = useUser((state) => state.signIn);

  const sigIn = authMutations(
    (data) => {
      toast.success(
        `Logged successfully, welcome ${data.user_metadata.username}`,
      );
      navigate("/");
    },
    (errorMessage) => {
      toast.error(errorMessage);
    },
  );

  const form = useForm<Pick<SignUpTypes, "email" | "password">>({
    defaultValues: {
      email: "",
      password: "",
    },
    validation: (inputs, errors) => {
      if (!inputs.email.includes("@") && !inputs.email.includes(".")) {
        errors.email = "email not valid";
      }
    },
    handleSubmit: (inputs) => sigIn(inputs),
  });

  return (
    <>
      <h1 className={scss.title}>Log in your account</h1>
      <p className={scss.subtitle}>enter your credentials to log in</p>

      <form className={scss.form} onSubmit={form.onSubmit}>
        <Input.Root hasError={!!form.errors?.email}>
          <Envelope size={32} />
          <Input.Input
            name="email"
            type="email"
            onChange={form.handleChange}
            disabled={form.isSubmitting}
            placeholder="Your best email"
          />
        </Input.Root>
        <Input.Error errorMessage={form.errors?.email} />

        <Input.Root hasError={!!form.errors?.password}>
          <Password size={32} />
          <Input.Input
            isSecret
            name="password"
            onChange={form.handleChange}
            disabled={form.isSubmitting}
            placeholder="Your secret password"
          />
        </Input.Root>
        <Input.Error errorMessage={form.errors?.password} />

        <Button
          fullScreen
          type="submit"
          disabled={form.isSubmitting}
          isLoading={form.isSubmitting}
        >
          Sign In
        </Button>
      </form>

      <p className={scss.login}>
        Don't have a account?{" "}
        <Link className={scss.login} to="/auth/signup">
          Sign Up
        </Link>
      </p>
    </>
  );
}

export default SignInForm;
