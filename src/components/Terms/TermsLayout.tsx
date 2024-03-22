import TermsMenu from "./TermsMenu";
import TermsSidebar from "./TermsSidebar";
import TermsTable from "./TermsTable";
import Pagination from "./Pagination";
import Notification from "./CRUD/Notification";
import style from "./TermsLayout.module.css";
import { useEffect, useState } from "react";
import { notificationActions } from "../../store/notificationSlice";
import { useCustomDispatch, useCustomSelector } from "../../store/hooks";

export default function TermsLayout() {
  const notification = useCustomSelector((state) => state.notification);
  const [notify, setNotify] = useState(false);
  const dispatch = useCustomDispatch();
  
  useEffect(() => {
    if (notification.message.trim() !== "") {
      setNotify((prevNotify) => true);
    }

    const notifTimeout = setTimeout(() => {
      setNotify((prevNotify) => false);
      dispatch(notificationActions.clearNotification())
    }, 2500);

    return () => {
      clearTimeout(notifTimeout);
    };
  }, [notification]);

  return (
    <>
      {notify && (
        <Notification
          message={notification.message}
          action={notification.action}
        />
      )}
      <div className={style.flex}>
        <TermsSidebar />
        <main className={`${style.main}`}> 
          <TermsMenu />
          <TermsTable />
          <Pagination />
        </main>
      </div>
    </>
  );
}
