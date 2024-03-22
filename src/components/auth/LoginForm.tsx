import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import style from "./LoginForm.module.css"
import { useCookies } from "react-cookie";

import { fetchLogin, validationSchema } from "../../utils/auth";

export default function LoginForm() {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate("/");
    }
  }, [cookies.token]);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  function handleChange(identifier: any, event: React.ChangeEvent<HTMLInputElement>) {
    setLogin((prevState) => {
      const newState = {
        ...prevState,
        [identifier]: event.target.value,
      };

      return newState;
    });
  }

  async function handleLogin() {
    try{
      const resData = await fetchLogin(login);
      setCookies("token", resData.authorization.token, { maxAge: 3600 });
      navigate("/terms");
    } catch (error: any) {
      setErrors(error)
    }

  }

  async function submit(e: React.FormEvent<HTMLFormElement> ) {
    e.preventDefault();

    try {
        await validationSchema.validate(login, { abortEarly: false });
        await handleLogin();
    } catch (validationErrors: any) {
        const errors: Record<string, string> = {}
        validationErrors.inner.forEach((error: {path: string, message:string}) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
    }
  }

  return (
    <form className={style["login-form"]} onSubmit={(e) => submit(e)}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => handleChange("email", e)}
      />
      {errors.email && <p className={style.error}>{errors.email}</p> }

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => handleChange("password", e)}
      />
      {errors.password && <p className={style.error}>{errors.password}</p> }


      {errors.message && <p className={style.error}>{errors.message}</p>}
      <button className="button-6 m-top">Submit</button>
    </form>
  );
}
