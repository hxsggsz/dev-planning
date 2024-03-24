import { AnimatePresence, Variant, motion } from "framer-motion";
import { useState } from "react";
import AddProfilePicture from "./components/addProfilePicture/addProfilePicture";
import SignUpForm from "./components/signupForm/signupForm";
import scss from "./signup.module.scss";

function signupVariants(direction: number): Record<string, Variant> {
  return {
    initial: {
      opacity: 0,
      x: direction ? 100 : -100,
      transition: { type: "tween" },
    },
    animate: { opacity: 1, x: 0, transition: { type: "tween" } },
    exit: {
      opacity: 0,
      x: direction ? 100 : -100,
      transition: { type: "tween" },
    },
  };
}

function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <main className={scss.wrapper}>
      <img src="/images/auth/auth.png" className={scss.img} />
      <section className={scss.content}>
        <AnimatePresence key={currentStep} mode="wait">
          {!currentStep ? (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={signupVariants(0)}
            >
              <SignUpForm setCurrentStep={setCurrentStep} />
            </motion.div>
          ) : (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={signupVariants(1)}
            >
              <AddProfilePicture />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default SignUp;
