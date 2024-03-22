import { createSlice } from "@reduxjs/toolkit";
import { IFetchedTerms } from "types/types";

const termsState = {
    data: <IFetchedTerms>{},
    loading: false
};

const termsSlice = createSlice({
    name: "terms",
    initialState: termsState,
    reducers:{
        setData(state, action){
           state.data = action.payload
        },
        setLoading(state, action){
           state.loading = action.payload
        }
    }
})

export const termsActions = termsSlice.actions;

export default termsSlice;