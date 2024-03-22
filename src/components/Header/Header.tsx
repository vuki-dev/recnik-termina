import { useCookies } from "react-cookie";
import { logout } from "../../utils/auth";
import classes from "./Header.module.css"

export default function Header(){
    const [cookies, setCookie, removeCookie] = useCookies()

    async function handleLogout(){
        const resData: any = await logout(cookies.token);
        removeCookie("token");
    }

    return <header className={`${classes.header}`}>
        {
            cookies.token && <button className="button-6" onClick={handleLogout}>Logout</button>
        }
    </header>
}