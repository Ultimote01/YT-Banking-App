import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


import Button from "../components/Button"
import api from "../api/api";
import "../styles/twofactorlogin.css"


function getInputsValue(){
  let valueString ="";
  for (let x = 0; x < 6; x++) {
    valueString += document.getElementById(`input-${x}`).value
  }
  return valueString
} 





export default function TwoFactorLogin() {
  const [disableInput, setDisableInput] = useState(false);
  const navigate = useNavigate();
  const hasRun = useRef(false);

  

  useEffect(()=> {
    const tempToken = JSON.parse(localStorage.getItem("tempToken"));

    if (tempToken === null || tempToken === undefined) {
       navigate("/", {replace: true});
    }

    if (!hasRun.current){
    document.getElementById(`input-0`).addEventListener('paste', (event) => {
    event.preventDefault();
    // Access clipboard data
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    console.log("Pasted content:", pasteData, isNaN(pasteData),Number(pasteData));
    
    if ( !isNaN(pasteData) && pasteData.length === 6){
    for (let x = 0; x < pasteData.length; x++){
      document.getElementById(`input-${x}`).removeAttribute('disabled');
      document.getElementById(`input-${x}`).value= pasteData[x];
      if (x > 0 ) document.getElementById(`input-${x}`).setAttribute('disabled', true);
    }
    verify(pasteData);
    }

    
    
    });
    hasRun.current=true;
  }

  })




  const verify = async (otp) => {
    if (otp.length !== 6) return;

    const tempToken = JSON.parse(localStorage.getItem("tempToken"));

    try {
       const res = await api.post("/2fa/auth", {
      otp,
      tempToken:tempToken?.tempToken
    });
  
    localStorage.removeItem("tempToken");
    localStorage.setItem("user", JSON.stringify(res.data));
  
    navigate("/", {replace: true});

    /* eslint-disable-next-line */
    }catch(err) {
     
      localStorage.setItem("2FA-Error", "Two-Factor Authentication Failed");
      localStorage.removeItem("tempToken");
      navigate("/login", {replace: true})
    }

    setDisableInput(false);
     
   

  }

    
 function handleInputKeyUp(e,index= Number(e.target.id.slice(-1))){
 
  if (e.code.includes("Digit")){
    e.target.value = e.key
   if (e.target.value !== ""){
      if (getInputsValue().length === 6) return verify(getInputsValue());
      document.getElementById(`input-${index+1}`)?.removeAttribute("disabled");
      document.getElementById(`input-${index+1}`)?.focus(); 
      document.getElementById(`input-${index}`).setAttribute("disabled", true);
       
    }

  }
  if (e.code === "Backspace") {
    document.getElementById(`input-${index-1}`)?.removeAttribute("disabled");
    document.getElementById(`input-${index-1}`)?.focus();
    if (index > 0){
     document.getElementById(`input-${index}`)?.setAttribute("disabled",true);
    }
  }
 
 }
 

  return (
    <div className="two-factor-login-c" >
      <div className="two-factor-login-v-c">
        <h1>Two-factor Auth</h1>
        <p> Enter the code sent to your authenticator app.</p>
        <div className="two-factor-login-input-c">
          {
          Array.from({length: 6}).map((el, index)=> <input key={index}    type={
            (window.matchMedia("only screen and (max-width: 760px)").matches && /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))? "number": "text"
          } id={`input-${index}`}
         
          onChange={(e)=> e.target.value=""} 
          disabled={index !== 0? true: false} 
          onKeyUp={handleInputKeyUp}
          />)
          }

        </div>
        <Button disabled={disableInput} onClick={()=>verify(getInputsValue())}>Verify</Button>
      </div>
      
    </div>
  );
}
