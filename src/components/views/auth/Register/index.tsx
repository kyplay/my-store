import style from "./Register.module.scss";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

const RegisterView = () => {
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      form.reset();
      push("/auth/login");
    } else {
      console.log("error");
    }
  };

  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Register</h1>
      <div className={style.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className={style.register__form__item__input}
            />
          </div>
          <div className={style.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className={style.register__form__item__input}
            />
          </div>
          <div className={style.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              id="phone"
              type="text"
              className={style.register__form__item__input}
            />
          </div>
          <div className={style.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={style.register__form__item__input}
            />
          </div>

          <button type="submit" className={style.register__form__button}>
            Register
          </button>
        </form>
      </div>
      <p className={style.register__link}>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
