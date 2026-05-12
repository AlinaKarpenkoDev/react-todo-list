import { useForm } from "react-hook-form";

export default function RegisterForm({ setCurrentUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const currentPassword = watch("password");

  const onSubmit = (data) => {
    console.log("Мої дані:", data);
    reset();
    setCurrentUser(data.userName);
  };

  return (
    <form
      className="register-form register-form animate-fade-in"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className={errors.userName ? "input-error" : "register-input"}
        type="text"
        placeholder="Ваше ім'я"
        {...register("userName", { required: "Вкажіть ваше ім'я" })}
      />
      {errors.userName && (
        <span className="error-message">{errors.userName.message}</span>
      )}
      <input
        type="email"
        className={errors.email ? "input-error" : "register-input"}
        placeholder="Введіть ваш email.."
        {...register("email", {
          required: "Пошта обов'язкова",
          pattern: { value: /^\S+@\S+$/i, message: "Невірний формат пошти" },
        })}
      />
      {errors.email && (
        <span className="error-message">{errors.email.message}</span>
      )}
      <input
        type="password"
        className={errors.password ? "input-error" : "register-input"}
        placeholder="Введіть пароль"
        {...register("password", {
          required: "Пароль обов'язковий",
          minLength: { value: 8, message: "Мінімум 8 символів" },
        })}
      />
      {errors.password && (
        <span className="error-message">{errors.password.message}</span>
      )}
      <input
        type="password"
        className={errors.confirmPassword ? "input-error" : "register-input"}
        placeholder="Введіть пароль ще раз"
        {...register("confirmPassword", {
          required: "Будь ласка, підтвердіть пароль",
          validate: (value) =>
            value === currentPassword || "Паролі не співпадають",
        })}
      />
      {errors.confirmPassword && (
        <span className="error-message">{errors.confirmPassword.message}</span>
      )}
      <button type="submit" className="submit-btn">
        Зареєструватися
      </button>
    </form>
  );
}
