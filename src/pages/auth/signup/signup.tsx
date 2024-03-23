import { useState } from "react";
import AddProfilePicture from "./components/addProfilePicture/addProfilePicture";
import SignUpForm from "./components/signupForm/signupForm";
import scss from "./signup.module.scss";

function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <main className={scss.wrapper}>
      <img src="/images/auth/auth.png" className={scss.img} />
      <section className={scss.content}>
        <h1 className={scss.title}>Create an accout</h1>
        <p className={scss.subtitle}>
          Enter your information to create an account
        </p>

        {!currentStep ? <SignUpForm /> : <AddProfilePicture />}
      </section>
    </main>
  );
}

export default SignUp;
