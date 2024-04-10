import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { Envelope, Password } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useForm } from "hxform";
import scss from "./signInForm.module.scss";
import { SignInProps, SignInTypes } from "./signInForm.type";

function SignInForm(props: SignInProps) {
  const form = useForm<SignInTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
    validation: (inputs, errors) => {
      if (!inputs.email.includes("@") && !inputs.email.includes(".")) {
        errors.email = "email not valid";
      }
    },
    handleSubmit: (inputs) => props.signIn(inputs),
  });

  return (
    <motion.form
      layout
      noValidate
      onSubmit={form.onSubmit}
      className={scss.wrapper}
    >
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
    </motion.form>
  );
}

export default SignInForm;
