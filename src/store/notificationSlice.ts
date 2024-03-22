import { createSlice } from "@reduxjs/toolkit"

interface NotificationIF {
    message: string,
    action: string,
    changed: boolean
}

const notificationSlice = createSlice({
    name: "notification",
    initialState: <NotificationIF>{
        message: "",
        action: "",
        changed: false,
    },
    reducers: {
        notify(state,action){
            state.message = action.payload.message,
            state.action = action.payload.action
            state.changed = !state.changed
        },
        clearNotification: (state) => {
            state.message = "";
            state.action = "";
        },
    }
})

export const notificationActions = notificationSlice.actions;

export default notificationSlice;