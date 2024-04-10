import { useUser } from "@/stores/useUser/useUser";
import SignUpForm from "./components/signUpForm/signUpForm";
import scss from "./signUp.module.scss";

function SignUp() {
  const signUp = useUser((state) => state.signUp);
  return (
    <main className={scss.wrapper}>
      <img src="/images/auth/auth.png" className={scss.img} />
      <section className={scss.content}>
        <h1 className={scss.title}>Create an account</h1>
        <p className={scss.subtitle}>You need an account to keep going here!</p>

        <SignUpForm signUp={signUp} />
      </section>
    </main>
  );
}

export default SignUp;
