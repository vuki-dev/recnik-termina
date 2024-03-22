import style from "./Notification.module.css"

export default function Notification({message,action}: {message: string, action: string}) {

    let notifyClass = "";
    if(action === "delete"){
        notifyClass = style.notificationDeleted
    } else if(action === "edit"){
        notifyClass = style.notificationEdited
    } else if(action === "add"){
        notifyClass = style.notificationAdded
    } else {
        notifyClass = style.notificationPrimary
    }
  
    return <div className={`${style.notification} ${notifyClass}`}>
        <p>{message}</p>
    </div>
}
