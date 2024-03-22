import { useCookies } from "react-cookie"
import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/Header/Header"
import { useEffect } from "react"

export default function RootLayout(){
    const [cookies] = useCookies()
    const navigate = useNavigate();

    const token = cookies.token;

    useEffect(()=>{
      if(!token){
        return navigate("login")
      }
    }, [cookies.token])

    return <>

        {token && <Header />}
        <Outlet />
    </>
}
