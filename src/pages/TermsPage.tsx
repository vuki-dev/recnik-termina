import TermsLayout from "../components/Terms/TermsLayout";
import {fetchTermsData} from "../store/termsFetcherActions"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from "../store/hooks";

export default function TermsPage() {
  const notification = useCustomSelector(state => state.notification)

  const [cookies] = useCookies();
  const dispatch = useCustomDispatch()
  const location = useLocation();
  
  useEffect(()=>{
    dispatch(fetchTermsData(`api/terms${location.search}`));
  },[location.search, notification.changed])

  return (
    <>
      <div>
        <TermsLayout />
      </div>
    </>
  );
}


