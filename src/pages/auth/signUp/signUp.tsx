import SignUpForm from "./components/signUpForm/signUpForm";
import scss from "./signUp.module.scss";

function SignUp() {
  return (
    <main className={scss.wrapper}>
      <img src="/images/auth/auth.png" className={scss.img} />
      <section className={scss.content}>
        <h1 className={scss.title}>Create an accout</h1>
        <p className={scss.subtitle}>You need an account to keep going here!</p>

        <SignUpForm />
      </section>
    </main>
  );
}

export default SignUp;
