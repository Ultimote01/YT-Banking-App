import { useEffect, useState } from "react";



import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Security from "../components/Security";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import FP from "../components/FullPage";
import Spinner from "../components/Spinner";
import Dashboard from "./Dashboard"
import About from "../components/About";
import Support from "../components/Support";
import { setRootBG } from "../util/helperFn";

 

 



export default function  LandingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        status: null
    });

    // if (userData.user?.firstName){
    //     setRootBG("dark:bg-zinc-950");
    // }else if (!userData.user?.firstName){
    //     setRootBG("bg-white","dark:bg-white");
    // }
    
     

    useEffect(()=>{
        async function authentice() {
            setIsLoading(true);
            try{
            const data = JSON.parse(localStorage.getItem("user"));
                    setUserData(
                    {
                        user: data.user
                    }
                );
        setIsLoading(false);
         /* eslint-disable-next-line */
        }catch(err){
            setIsLoading(false);
        }
        }
        authentice();
        
    }, []);



    if (isLoading) return <FP><Spinner/></FP>;
    
    return (
        <>   
            {userData.user?.firstName? <Dashboard /> : 
            ["302"].includes(String(userData.status))? <div>not found</div> : <>
            <Header/>
            <main style={{flex: "1 1 auto"}}>
            <Hero/>
            <Features/>
            <Security/>
            <CallToAction/>
            <About/>
            <Support/>
            </main>
             <Footer/> 
            </> }
             
        </>
    
    )


}