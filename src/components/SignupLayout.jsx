import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";


import Container from "./Container";
import TextField from "./TextField";
import Button from "./Button";
import Spinner from "./Spinner";
import api from "../api/api";
import "../styles/signup.css";
import AuthLayout from "./AuthLayout";
 


export default function SignupLayout(){
    const [isLoading, setIsLoading] = useState(false);
    const {register,reset,formState,handleSubmit,getValues} = useForm();
    const [resError, setReserror] = useState("");
    const navigate = useNavigate();

    const {errors} = formState;

  useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("user"));
        const tempToken = JSON.parse(localStorage.getItem("tempToken"));


        if (user?.user) {
            return navigate("/", {replace: true});
        }
        if (tempToken?.requires2FA) {
            return navigate("/authenticator/app")
        }

    },[navigate])

 

    async function submit (data) {
        setIsLoading(true);
        try{
            const res = await api.post("/auth/register/",{
                firstName: data.fullname.split(" ")[0],
                lastName: data.fullname.split(" ")[1],
                email: data.email,
                password:data.password
            });
            
            reset();
            localStorage.setItem("user", JSON.stringify(res.data));

            navigate({
                pathname: "/",
                replace: true,
            }
            );
            setIsLoading(false);
             
        }catch(error){
            setReserror(error?.response?.data?.message);
            setIsLoading(false);
        }

        
    }
    

    return (
        <AuthLayout >
        <Link to={"/"}> 
            <div className={"s-logo-container"}>
                    <img src="/yabatech_logo.jpg" className="logo-container-img"/>
                <span className="s-logo-container-span1">YT Banking App</span>
            </div>
            </Link>
            <h1 className="signup-box-c-h1">Create a user account</h1>
            <span className="signup-box-error-span">{resError}</span>

            <div className="signup-box-form-c"> 
            <form onSubmit={handleSubmit(submit)}>
                <div>
                <label htmlFor="fullname">Name</label>
                <TextField type="text" id="fullname" autoComplete="username"{...register("fullname",
                    {
                        required: "This field is required",
                        maxLength: 30
                    }
                )} disabled={isLoading}  placeholder={"Jhon Doe"}  >
                </TextField>
                    {<span style={{paddingLeft:'0.5rem',marginTop:'1.5rem',color:'rgb(238, 28, 28)'}}>{errors?.fullname?.message}</span>}
                </div>

                 <div> 
                <label htmlFor="email">Email</label>
                <TextField type="email" id="email" autoComplete="email" {...register(
                    "email",
                    {
                        required: "This field is required",
                            pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message:"Please provide a valid email"
                        }
                    }
                )} disabled={isLoading} placeholder={"jhondoe@example.com"}  >
                </TextField>
                {<span style={{paddingLeft:'0.5rem',marginTop:'1.5rem',color:'rgb(238, 28, 28)'}}>{errors?.password?.message}</span>}
                </div>
                
                <div> 
                <label htmlFor="password">Password</label>
                <TextField type="password" id="password"{...register(
                    "password",
                    {
                        required: "This field is required",
                        minLength:{value:8,message:"password should be atleast 8 characters"}
                    }
                )} disabled={isLoading} placeholder={"***********"}  >
                </TextField>
                {<span style={{paddingLeft:'0.5rem',marginTop:'1.5rem',color:'rgb(238, 28, 28)'}}>{errors?.password?.message}</span>}
                </div>

                <div> 
                <label htmlFor="confirm-password">Confirm Password</label>
                <TextField type="password" id="confirm-password" {...register(
                    "confirmPassword",
                    {
                        required: "This field is required",
                        validate: (value)=> value === getValues().password || "password must match" 
                    }
                )} disabled={isLoading} placeholder={"************"}  >
                </TextField>
                {<span style={{paddingLeft:'0.5rem',marginTop:'1.5rem',color:'rgb(238, 28, 28)'}}>{errors?.confirmPassword?.message}</span>}
                </div>
                
                <Button as="accent" style={{background: "rgb(86 2 212 / 1)"}} disabled={isLoading}>{isLoading? <Spinner/>: "Signup"}</Button>
            </form>
                <span className="login-line">Already a member? <Link to={"/login"}>Sign In</Link></span>
            </div>
        </AuthLayout>
        
    );
}