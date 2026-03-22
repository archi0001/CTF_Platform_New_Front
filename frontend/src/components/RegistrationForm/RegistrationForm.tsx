import styles from "./RegistrationForm.module.css";

import LineIcon from "@/assets/icons/LineIcon";
import RequiredIcon from "@/assets/icons/RequiredIcon";

import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "@/App";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type RegisterRequest } from "../../models/request/IRegister";

function RegistrationForm() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<RegisterRequest>({
    mode: "onChange",
  });

  const firstErrorEntry = isSubmitted ? Object.entries(errors)[0] : null;
  const firstError = firstErrorEntry
    ? { name: firstErrorEntry[0], error: firstErrorEntry[1] }
    : null;

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    const fullName = data["lastname"].trim().split(" ");
    if (fullName.length !== 3) return;
    const newForm = {
      ...data,
      lastname: fullName[0] || "",
      firstname: fullName[1] || "",
      secondname: fullName[2] || "",
    };
    if (
      Object.keys(newForm).every((key) =>
        newForm[key as keyof typeof newForm].trim()
      )
    ) {
      if (newForm["password"] === newForm["confirmPassword"]) {
        Object.keys(newForm).forEach((key) => {
          store.setRegistrationField(
            key as keyof typeof data,
            newForm[key as keyof typeof newForm].trim()
          );
        });
        const res = await store.register();

        if (res) {
          navigate("/");
          reset();
        }
      }
    }
  };

  return (
    <div className={styles.form}>
      <header className={styles.header}>
        <h2 className={styles.headerLabel}>Регистрация</h2>
        <h2 className={styles.headerDescription}>
          Введите ваши данные для регистрации
        </h2>
      </header>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registrationForm}
      >
        <div className={styles.registrationFields}>
          <div className={styles.doubleForm}>
            <div className={styles.field}>
              <div className={styles.formLabel}>
                <label className={styles.formLabelText}>Никнейм</label>
                <RequiredIcon />
              </div>
              <input
                placeholder="outscript"
                {...register("nickname", {
                  required: "Обязательное поле",
                  pattern: {
                    value: /^[a-zA-Zа-яА-ЯёЁ0-9]+$/,
                    message: "Некорректный никнейм",
                  },
                })}
                className={styles.formInputDouble}
              />
            </div>
            <div className={styles.field}>
              <div className={styles.formLabel}>
                <label className={styles.formLabelText}>ФИО</label>
                <RequiredIcon />
              </div>
              <input
                placeholder="Иванов Иван Иванович"
                {...register("lastname", {
                  required: "Обязательное поле",
                  pattern: {
                    value:
                      /^[A-Za-zА-Яа-яЁё]+(?:-[A-Za-zА-Яа-яЁё]+)?\s[A-Za-zА-Яа-яЁё]+(?:-[A-Za-zА-Яа-яЁё]+)?\s[A-Za-zА-Яа-яЁё]+(?:-[A-Za-zА-Яа-яЁё]+)?$/,
                    message: "Некорректный формат ФИО",
                  },
                })}
                className={styles.formInputDouble}
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.formLabel}>
              <label className={styles.formLabelText}>ВУЗ</label>
              <RequiredIcon />
            </div>
            <input
              placeholder="ГУЛАГ"
              className={styles.formInputSingle}
              {...register("university", {
                required: "Обязательное поле",
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ]+$/,
                  message: "Некорректный формат названия ВУЗА",
                },
              })}
            />
          </div>

          <div className={styles.doubleForm}>
            <div className={styles.field}>
              <div className={styles.formLabel}>
                <label className={styles.formLabelText}>
                  Электронная почта
                </label>
                <RequiredIcon />
              </div>
              <input
                placeholder="example@gmail.com"
                className={styles.formInputDouble}
                {...register("email", {
                  required: "Обязательное поле",
                  pattern: {
                    value:
                      /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)$/,
                    message: "Некорректный формат почты",
                  },
                })}
              />
            </div>
            <div className={styles.field}>
              <div className={styles.formLabel}>
                <label className={styles.formLabelText}>Телеграм</label>
                <RequiredIcon />
              </div>
              <input
                placeholder="@username"
                {...register("contact", {
                  required: "Обязательное поле",
                  pattern: {
                    value: /^@[a-zA-Z0-9]+$/,
                    message: "Некорректный тег телеграма",
                  },
                })}
                className={styles.formInputDouble}
              />
            </div>
          </div>

          <div className={styles.doubleForm}>
            <div className={styles.field}>
              <div className={styles.formLabel}>
                <label className={styles.formLabelText}>Пароль</label>
                <RequiredIcon />
              </div>
              <input
                type="password"
                placeholder="Введите пароль"
                {...register("password", {
                  required: "Обязательное поле",
                  minLength: {
                    value: 8,
                    message: "Маленькая длина",
                  },
                  maxLength: {
                    value: 50,
                    message: "с ума сошел...",
                  },
                })}
                className={styles.formInputDouble}
              />
            </div>
            <div className={styles.field}>
              <div className={styles.formLabel}>
                <label className={styles.formLabelText}>
                  Подтверждение пароля
                </label>
                <RequiredIcon />
              </div>
              <input
                type="password"
                placeholder="Повторите пароль"
                {...register("confirmPassword", {
                  required: "Обязательное поле",
                  minLength: {
                    value: 8,
                    message: "Маленькая длина",
                  },
                  maxLength: {
                    value: 50,
                    message: "с ума сошел...",
                  },
                })}
                className={styles.formInputDouble}
              />
            </div>
          </div>
        </div>
        {firstError && (
          <span className={styles.error}>{firstError.error.message}</span>
        )}
        <p className={styles.loggedLabel}>
          Уже есть аккаунт?
          <span
            className={styles.clickableText}
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Войдите{" "}
          </span>
          бесплатно
        </p>
        <button className={styles.submitButton}>Зарегистрироваться</button>
      </form>
      <footer className={styles.footer}>
        <LineIcon />
        <p>
          Нажимая "Зарегистрироваться" вы принимаете
          <span
            className={styles.clickableText}
            onClick={() => {
              navigate("whatdidyouexpect");
            }}
          >
            {" "}
            пользовательское соглашение{" "}
          </span>
          и
          <span
            className={styles.clickableText}
            onClick={() => {
              navigate("/whatdidyouexpect");
            }}
          >
            {" "}
            политику конфиденциальности{" "}
          </span>
        </p>
      </footer>
    </div>
  );
}

export default observer(RegistrationForm);
