import { termsActions } from "./termsSlice";
import { fetchData } from "../utils/requests";

export function fetchTermsData(url: string, token?: string){
    return async (dispatch: any) => {
        try{
            dispatch(termsActions.setLoading(true))
            const data = await fetchData(url);
            dispatch(termsActions.setData(data))
            dispatch(termsActions.setLoading(false))
        } catch(error: any){
            console.log(error.message)
        }
    }
}