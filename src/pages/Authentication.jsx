import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import DashboardLayout from "../components/DashboardLayout"
import SetGoogleAuth from "../components/SetGoogleAuth";
import SetWhatsAppAuth from "../components/SetWhatsAppAuth";
import "../styles/authentication.css"
 


function GoogleAuthIcon (){
  return(
    <img src="google-auth-icon.png" style={{
      marginTop: "0.2rem",
      width: "20px",
      height: "20px",
      objectFit: "contain"
    }}/>
  )
}


function WAIcon() {
  return(
    <img src="WAIcon.webp" style={{
      marginTop: "0.35rem",
      width: "15px",
      height: "15px",
      objectFit: "contain"
    }}/>
  )
}






export default function Authentication() {
  const navigate = useNavigate();
  const [open , setOpen] = useState(false);
  const [openMethod , setOpenMethod] = useState('');
  const [userObject, setUserObject] = useState(
    JSON.parse(localStorage.getItem("user"))
  )
 

  useEffect(()=>{
    if (userObject === null) navigate("/", {replace: true})
  })

  
  
  function handleSelect(event){
    let  siggnOutUpdate =JSON.parse(localStorage.getItem("signOutUpdate"));
  
    if (siggnOutUpdate !== null && siggnOutUpdate !== undefined) {
      siggnOutUpdate.preferredAuthMethod = event.target.value;
      localStorage.setItem("signOutUpdate",JSON.stringify(siggnOutUpdate));
    }else {
      siggnOutUpdate = {preferredAuthMethod: event.target.value};
      localStorage.setItem("signOutUpdate",JSON.stringify(siggnOutUpdate));
    }
 

  }

  const authMethods =  userObject?.user?.twoFAMethods;
  


  if (userObject === null ) return <div></div>
   

    return (
     
        <DashboardLayout user={userObject?.user}>

        <div className="auth-container">

            <h1 className="text-zinc-950 dark:text-white">Two-factor Authentication</h1>
            <hr></hr>
            <p className="text-zinc-900 dark:text-[rgb(255,255,225,0.8)]">Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in</p>

            <div className="auth-preferred-method-c border-[0.5px] dark:border-[rgb(255,255,225,0.4)]">
                <div className="bg-[rgb(244,244,245,1)] text-zinc-950 dark:text-white dark:bg-[#27272a]"> 
                <h3>Prefered 2FA method</h3>
                </div>

                <p className="text-zinc-900 dark:text-[rgb(255,255,225,0.8)]">Set your preferred method to use for two-factor authentication when signing into </p>

                <select name="preferred-method" onChange={(e)=> handleSelect(e)} 
                  className="bg-[rgb(244,244,245,1)] outline-[0.2px] outline-[rgb(255,255,225,0.8)] outline-solid text-zinc-950 dark:text-white dark:bg-[#27272a]"
                  >
               
                {[{name:"none"},...authMethods].map((method, index)=> 
                <option  key={index} value={method?.name} selected={method?.preferred}  >{method?.name}</option> )}
            </select>
            </div>

            <div className="auth-2fa-method-c border-[0.5px] dark:border-[rgb(255,255,225,0.4)]">

                <div className="auth-2fa-method-c-div1 bg-[rgb(244,244,245,1)] text-zinc-950 dark:text-white dark:bg-[#27272a]">
                  <h3> Two-factor methods </h3>
                  </div>

                <div  className="auth-2fa-method-c-div2">


                {[["Google Authenticator", GoogleAuthIcon, "Create two-factor-authentication with the Google authenticator app", SetGoogleAuth],
                ["WhatsApp",WAIcon, "Enable two-factor-authentication with your WhatsApp  number", SetWhatsAppAuth]
                
                /* eslint-disable-next-line */
                ].map(([method, Icon, description, Component], index)=>
                <div className="auth-2fa-method-wrapper" key={index}>
                
                <div className=" auth-2fa-method border-[0.3px] border-[gb(244,244,245,1)]  dark:border-[rgb(255,255,225,0.1)]">

                  <div className="auth-2fa-method-ct"> 
                  <div>
                    <div style={{display: "flex", columnGap: "0.5rem"}} className="text-zinc-950 dark:text-white">{method}{Icon && <Icon/>}</div>
                    <p style={{fontSize: "0.72rem", lineHeight: "1rem"}} className="text-zinc-900 dark:text-[rgb(255,255,225,0.8)]">{description}</p>
                  </div>
                  <button disabled={open} onClick={()=> {setOpen(true); setOpenMethod(method)}}
                    className="bg-[rgb(244,244,245,1)] text-zinc-950 dark:text-white dark:bg-[#27272a]"
                    >
                  {userObject?.user?.twoFAMethods?.some((el)=>
                  el.name === method) ? "Edit": "Add"}</button>
                  </div>

                  { openMethod === method &&  <div style={{marginTop: "1.5rem", paddingLeft:"1rem"}}> {<Component setOpen={setOpen} method={method} 
                  setOpenMethod={setOpenMethod} setUserObject={setUserObject}/>} </div>}
                </div>

                 

                </div>)}
                </div>
            </div>
             

        </div>
        
            
        </DashboardLayout>
    )
}