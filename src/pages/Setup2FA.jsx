import { useState , useEffect} from "react";



import api from "../api/api";
import requestApi from "../util/helperFn";
import "../styles/set2factor.css"



export default function SetTwoFactor({setOpen, setOpenMethod, method,setUserObject}) {
  const [otp, setOtp] = useState("");
  const [qr, setQr] = useState(null);



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

    if (res.data?.message === "2FA enabled"){
       if (  activeUser?.user?.twoFAEnabled !==  null && activeUser?.user?.twoFAEnabled !== undefined )
          activeUser.user.twoFAEnabled = true ;

          const twoFAExist = activeUser.user.twoFAMethods.some((el)=> {
          if (el.name === method) return true;
          return false;
          })

          if (!twoFAExist) activeUser.user.twoFAMethods.push(res.data.twoFAData)
            
    localStorage.setItem("user", JSON.stringify(activeUser));

    setUserObject(JSON.parse(localStorage.getItem("user")));
    setOpen(false);
    setOpenMethod("");
    

    }

     /* eslint-disable-next-line */
    }catch(err) {}
  
    
    
  };



  return (
    
    <div className="setup-two-factor-c">
      {qr && <img src={qr?.qr} alt={qr?.manualCode?? "Qr code"}></img>}
      <h2>Enter 2FA Code</h2>
      <input placeholder="123456" onChange={e => setOtp(e.target.value)} />
      <div className="setup-two-factor-b-c"> 
      <button role="cancel" onClick={()=>{setOpen(false); setOpenMethod("")}}>Cancel</button>
      <button role="verify" onClick={verify}>Verify</button>
      </div>
    </div>
  );
}
