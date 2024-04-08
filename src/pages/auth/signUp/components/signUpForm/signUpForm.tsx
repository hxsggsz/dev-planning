import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { SignUpTypes } from "@/types/auth";
import { Envelope, Password, UserCircle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useForm } from "hxform";
import { useState } from "react";
import PasswordGuide from "../passwordGuide/passwordGuide";
import scss from "./signUpForm.module.scss";
import { SignUpFormProps } from "./signUpForm.type";

function SignUpForm(props: SignUpFormProps) {
  const [shouldShowGuide, setShouldShowGuide] = useState(false);

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
    handleSubmit: (inputs) => props.signUp(inputs),
  });

  return (
    <motion.form
      layout
      noValidate
      onSubmit={form.onSubmit}
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
  );
}

export default SignUpForm;
