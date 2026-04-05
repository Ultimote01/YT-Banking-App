import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";


import Container from "./Container";
import TextField from "./TextField";
import Button from "./Button";
import Spinner from "./Spinner";
import "../styles/login.css";
import api from "../api/api";
import AuthLayout from "./AuthLayout";




export default function LoginLayout(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {handleSubmit,register} = useForm();
    const navigate = useNavigate();

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("user"));
        const tempToken = JSON.parse(localStorage.getItem("tempToken"));

        if (user?.user) {
            return navigate("/", {replace: true});
        }
        if (tempToken?.requires2FA) {
            
            if (tempToken.method === "Google Authenticator"){
    
                navigate("/authenticator/app")
            }
              
        }


        function set2FAError(){

            const twoFAError = localStorage.getItem("2FA-Error");

            if (twoFAError !== undefined && twoFAError !== null){
                setError({message:twoFAError});
                localStorage.removeItem("2FA-Error");
            }
        }

        set2FAError();
      

    },);



    async function submit({email,password}) {
    
        setIsLoading(true);
        try {
                const res = await api.post("/auth/login",{email,password});
                
                if (res.data.requires2FA){
                    localStorage.setItem("tempToken", JSON.stringify(res.data))

                    if (res.data?.method === "Google Authenticator"){
                        return navigate("/authenticator/app")
                    }
                    return navigate("/");

                }

                 

                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/");

        }catch(err) {
            setError(err?.response?.data)
            console.log("error", err)
        }
        setIsLoading(false);
         
    }

   

    return (
        <AuthLayout>
             <Link to={"/"}> 
                <div className={"l-logo-container"}>
                        <img src="/yabatech_logo.jpg" className="logo-container-img"/>
                    <span className="l-logo-container-span1">YT Banking App </span>
                </div>
                </Link>
                <h1 className="login-box-c-h1">Not yet a member? <Link to={"/signup"}>Sign Up</Link></h1>

                <h3 className="login-box-h3">{error?.message}</h3>

                <div className="login-box-form-c"> 
                <form onSubmit={handleSubmit(submit)} >
                    <div>
                    <label htmlFor="email">Email address</label>
                    <TextField type="email" id="email" autoComplete="username" placeholder="jhondoe@ymail.com"
                    {...register("email")}>
                    </TextField>
                    </div>
                    <div> 
                    <label htmlFor="password">Password</label>
                    <TextField type="password" id="password" placeholder="*******"
                    {...register("password")}></TextField>
                    </div>
                    <Button as="accent" disabled={isLoading} style={{background: "rgb(86 2 212 / 1)"}}> { isLoading? <Spinner/>:"Log In"}</Button>
                </form>
                </div>
        </AuthLayout>
    );
}