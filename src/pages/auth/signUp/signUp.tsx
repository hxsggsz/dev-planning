import { useUser } from "@/stores/useUser/useUser";
import SignUpForm from "./components/signUpForm/signUpForm";
import scss from "./signUp.module.scss";
import { Link } from "react-router-dom";

function SignUp() {
  const signUp = useUser((state) => state.signUp);

  return (
    <main className={scss.wrapper}>
      <img src="/images/auth/auth.png" className={scss.img} />
      <section className={scss.content}>
        <h1 className={scss.title}>Create an account</h1>
        <p className={scss.subtitle}>You need an account to keep going here!</p>

        <SignUpForm signUp={signUp} />

        <Link className={scss.link} to="/auth/signin">
          Already have an account? signin
        </Link>
      </section>
    </main>
  );
}

export default SignUp;
