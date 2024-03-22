import * as yup from 'yup';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


interface ILoginData {
  email: string,
  password: string
}

export async function fetchLogin(loginData: ILoginData) {
  const response = await fetch(
    apiUrl +"api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  );

  if (!response.ok) {
    throw new Error("Login attempt failed.");
  }

  return response.json();
}

export async function logout(token: string) {
  const response = await fetch(
    apiUrl + "api/auth/logout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Logout attempt failed.");
  }

  return response.json();
}

export const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
