import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { Envelope, Password, UserCircle } from "@phosphor-icons/react";
import scss from "./signupForm.module.scss";
import { useForm } from "hxform";
import { SignUpTypes } from "@/types/auth";
import { useUser } from "@/stores/useUserStore/useUserStore";
import { useToast } from "@/context/toastContext/useToast";
import { useState } from "react";
import { motion } from "framer-motion";
import { SignUpProps } from "./signupForm.type";
import PasswordGuide from "./components/passwordGuide/passwordGuide";
import { Link } from "react-router-dom";

function SignUpForm(props: SignUpProps) {
  const [shouldShowGuide, setShouldShowGuide] = useState(false);

  const { toast } = useToast();

  const useUserStore = useUser((state) => state.signUp);
  const signUp = useUserStore(
    (data) => {
      toast.success(`Success, welcome ${data.user_metadata.username}`);
      props.setCurrentStep((prev) => ++prev);
    },
    (errorMessage) => {
      toast.error(errorMessage);
    },
  );

  const form = useForm<SignUpTypes>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validation: (inputs, errors) => {
      const passwordRegex =
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

      if (inputs.username.length < 3 || inputs.username.length > 30) {
        errors.username = "Username must be between 3 and 30 characters long";
      }

      if (!inputs.email.includes("@") && !inputs.email.includes(".")) {
        errors.email = "email not valid";
      }

      if (!passwordRegex.test(inputs.password)) {
        errors.password = "your password is not strong enough";
      }

      if (inputs.password !== inputs.confirmPassword) {
        errors.password =
          "password must be equal to your password confirmation";
        errors.confirmPassword =
          "password must be equal to your password confirmation";
      }
    },
    handleSubmit: (inputs) => signUp(inputs),
  });

  return (
    <>
      <h1 className={scss.title}>Create an accout</h1>
      <p className={scss.subtitle}>
        Enter your information to create an account
      </p>

      <motion.form
        layout
        onSubmit={form.onSubmit}
        noValidate
        className={scss.wrapper}
      >
        <Input.Root hasError={!!form.errors?.username}>
          <UserCircle size={32} />
          <Input.Input
            name="username"
            onChange={form.handleChange}
            disabled={form.isSubmitting}
            placeholder="Your best username"
          />
        </Input.Root>
        <Input.Error errorMessage={form.errors?.username} />

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
            onFocus={() => setShouldShowGuide(true)}
            onBlur={() => setShouldShowGuide(false)}
          />
        </Input.Root>
        <Input.Error errorMessage={form.errors?.password} />

        <PasswordGuide
          password={form.inputs.password}
          shouldShow={shouldShowGuide}
        />

        <Input.Root hasError={!!form.errors?.confirmPassword}>
          <Password size={32} />
          <Input.Input
            isSecret
            name="confirmPassword"
            onChange={form.handleChange}
            disabled={form.isSubmitting}
            placeholder="Confirm your password"
          />
        </Input.Root>
        <Input.Error errorMessage={form.errors?.confirmPassword} />

        <Button
          fullScreen
          type="submit"
          disabled={form.isSubmitting}
          isLoading={form.isSubmitting}
        >
          Sign Up
        </Button>
      </motion.form>
      <p className={scss.login}>
        already have a account?{" "}
        <Link className={scss.login} to="/auth/signin">
          Log in
        </Link>
      </p>
    </>
  );
}

export default SignUpForm;
