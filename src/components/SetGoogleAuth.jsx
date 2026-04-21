import { useState , useEffect} from "react";



import api from "../api/api";
import requestApi from "../util/helperFn";
import "../styles/setgoogleauth.css"
import isMobile from "../util/chcekIsMobile";


function CopyIcon({...props}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>


  )
}


async function copyText( code) {

  try {

    await navigator.clipboard.writeText(code);

    const icon = document.getElementsByClassName("g-auth-copy-button")[0];
    icon.classList.add("g-auth-copy-button-note");
    
    setTimeout(() => { 
      icon.classList.remove("g-auth-copy-button-note");
    
     }, 2000); 

  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}



export default function SetGoogleAuth({setOpen, setOpenMethod, method,setUserObject}) {
  const [otp, setOtp] = useState("");
  const [qr, setQr] = useState(null);
  const [errorObj, setErrorObj] = useState(null);



  useEffect(()=>{
  const setUp = async ()=> {
    try{

      if (requestApi()){
      const email = localStorage.getItem("user");
      const res = await api.post("/2fa/setup", {email});
    
      setQr(()=> res.data);
      }
      /* eslint-disable-next-line */
    }catch(err){}
  }

  setUp();

   },[])
    
  
  



  const verify = async () => {

    const activeUser = JSON.parse(localStorage.getItem("user"));
    try{
         const res = await api.post("/2fa/verify", {
      otp,
      method
    });
    console.log("setup in progress")

    if (res.data?.message === "2FA enabled"){
       if (  activeUser?.user?.twoFAEnabled !==  null && activeUser?.user?.twoFAEnabled !== undefined ){
          // activeUser.user.twoFAEnabled = true;

          const twoFAExist = activeUser.user.twoFAMethods.some((el)=> {
          if (el.name === method) return true;
          return false;
          })
 
          if (!twoFAExist) activeUser.user.twoFAMethods.push(res.data.twoFAData)
       }
            
    localStorage.setItem("user", JSON.stringify(activeUser));

    setUserObject(JSON.parse(localStorage.getItem("user")));
    setOpen(false);
    setOpenMethod("");
    setOtp("");

    } else if ( res.data?.message === "Invalid token"){
      if (  activeUser?.user?.twoFAEnabled !==  null && activeUser?.user?.twoFAEnabled !== undefined ){
          
        activeUser.user.twoFAMethods= activeUser.user.twoFAMethods.filter((activeMethod)=>
          method !== activeMethod?.name
            )}

    localStorage.setItem("user", JSON.stringify(activeUser));
    setUserObject(JSON.parse(localStorage.getItem("user")));
    setOpen(false);
    setOpenMethod("");
    setOtp("");

    }


     /* eslint-disable-next-line */
    }catch(err) {
      console.log("Error",err?.response?.data);
      setErrorObj(err?.response?.data);
    }
  };


  return (
    
    <div className="setup-two-factor-c">
      <hr style={{marginTop: "-0.5rem", marginBottom: "1rem"}}/>
      {errorObj && <p className="text-[red] pl-[9px]">{errorObj?.error? `!! ${errorObj?.error}`: ""}</p>}
      {qr && <img src={qr?.qr} alt={qr?.manualCode?? "Qr code"}/>}

      <h2 className="text-zinc-950 dark:text-white">Scan QR code to register {isMobile() ? <span>or copy 
      <button className="g-auth-copy-button" onClick={()=> copyText(qr?.manualCode)}><CopyIcon className="g-auth-copy-icon"/>
      </button> 

      <br/><br/> Enter Auth code below</span>: `and enter Auth code below` }</h2>

      <input 
      className=" border-[0.5px] text-black  py-[3px] pl-[4px]  dark:border-[rgb(135, 118, 118)]"
       placeholder="123456" onChange={e => setOtp(e.target.value)} maxLength={10} />
      <div className="setup-two-factor-b-c"> 
      <button role="cancel" onClick={verify}>Cancel</button>
      <button disabled={otp? false : true} role="verify" onClick={verify}>Verify</button>
      </div>
    </div>
  );
}
