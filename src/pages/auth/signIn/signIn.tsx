import { useUser } from "@/stores/useUser/useUser";
import SignInForm from "./components/signInForm/signInForm";
import scss from "./signIn.module.scss";
import { Link } from "react-router-dom";

function SignIn() {
  const signIn = useUser((state) => state.signIn);

  return (
    <main className={scss.wrapper}>
      <img src="/images/auth/auth.png" className={scss.img} />
      <section className={scss.content}>
        <h1 className={scss.title}>Sign In with your account</h1>
        <p className={scss.subtitle}>
          You need your account to keep going here!
        </p>

        <SignInForm signIn={signIn} />

        <Link className={scss.link} to="/auth/signup">
          Don't have an account? signup
        </Link>
      </section>
    </main>
  );
}

export default SignIn;
