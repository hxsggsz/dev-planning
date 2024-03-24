import SignInForm from "./components/signinForm/signinForm";
import scss from "./signin.module.scss";

function SignIn() {
  return (
    <main className={scss.wrapper}>
      <img src="/images/auth/auth.png" className={scss.img} />
      <section className={scss.content}>
        <SignInForm />
      </section>
    </main>
  );
}

export default SignIn;
