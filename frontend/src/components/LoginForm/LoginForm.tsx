import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";

import { useContext, useState } from "react";
import { Context } from "@/App";
import { observer } from "mobx-react-lite";

import LineIcon from "@/assets/icons/LineIcon";
import RequiredIcon from "@/assets/icons/RequiredIcon";

import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
    setError,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const firstErrorEntry = isSubmitted ? Object.entries(errors)[0] : null;
  const firstError = firstErrorEntry
    ? { name: firstErrorEntry[0], error: firstErrorEntry[1] }
    : null;

  const { store } = useContext(Context);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const res = await store.login(data["email"], data["password"]);
    if (res) {
      reset();
      navigate("/");
    } else {
      setError("password", {
        type: "server",
        message: "Неверная почта или пароль",
      });
    }
  };

  return (
    <div className={styles.loginForm}>
      <header className={styles.header}>
        <p className={styles.title}>Вход</p>
        <p className={styles.description}>Введите ваши данные для входа</p>
      </header>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formGroup}
      >
        <div className={`${styles.form}`}>
          <div className={styles.formLabel}>
            <label className={styles.formLabelText} htmlFor="email">
              Электронная почта
            </label>
            <RequiredIcon />
          </div>
          <input
            type="email"
            placeholder={"example@guap.ru"}
            {...register("email", {
              required: "Почта обязательна",
              pattern: {
                value: /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)$/,
                message: "Некорректный формат почты",
              },
            })}
            className={`${styles.formInput}`}
          />
        </div>
        <div className={`${styles.form}`}>
          <div className={styles.formLabel}>
            <label className={styles.formLabelText} htmlFor="password">
              Пароль
            </label>
            <RequiredIcon />
          </div>
          <input
            type="password"
            placeholder={"Введите ваш пароль"}
            {...register("password", {
              required: "Пароль обязателен",
            })}
            className={`${styles.formInput}`}
          />
          {firstError && (
            <span className={styles.error}>{firstError.error.message}</span>
          )}
        </div>
        <div className={styles.formOptions}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            <span className={styles.checkboxLabel}>Запомнить меня</span>
          </label>

          <Link to="/forgot-password" className={styles.forgotPassword}>
            Забыли пароль?
          </Link>
        </div>

        <button type="submit" className={styles.submitButton}>
          Войти
        </button>
      </form>

      <footer className={styles.footer}>
        <LineIcon />
        <p>
          Нажимая "Войти", вы принимаете
          <span
            className={styles.clickableText}
            onClick={() => {
              navigate("/");
            }}
          >
            {" пользовательское соглашение "}
          </span>
          и
          <span
            className={styles.clickableText}
            onClick={() => {
              navigate("/");
            }}
          >
            {" политику конфиденциальности "}
          </span>
        </p>
      </footer>
    </div>
  );
}

export default observer(LoginForm);
