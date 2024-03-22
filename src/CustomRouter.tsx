import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import LoginPage from "./pages/login-reg/LoginPage";
import TermsPage from "./pages/TermsPage";

export default function CustomRouter(){
    const router = createBrowserRouter([
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              path: "login",
              element: <LoginPage />,
            },
            {
              path: "terms",
              element: <TermsPage />,
              
            },
          ],
        },
      ]);

    return <RouterProvider router={router}></RouterProvider>
}