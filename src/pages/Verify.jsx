import { useEffect, useState } from "react"
import { useParams , useSearchParams} from "react-router-dom";


import {handleVerifyEmail} from "../api/api";
import "../styles/verify.css"


export default function Verify() {
    const [emailVerified, setEmailVerified] = useState(false);
    const [error, setError] = useState();
    const [ searchParams ] = useSearchParams();
    const {id} = useParams();
    



    useEffect(()=>{

        if (id == "email") handleVerifyEmail(setEmailVerified,setError,searchParams);
    },[searchParams, id])



    return(
        <div className="verify-container">
            {emailVerified ? <div>Your email has been verified. </div> : 
            <div>{error?.message}</div>}
        </div>
    )
}