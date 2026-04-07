import { useEffect, useState } from "react";
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

  

  useEffect(()=> {
    const tempToken = JSON.parse(localStorage.getItem("tempToken"));

    if (tempToken === null || tempToken === undefined) {
       navigate("/", {replace: true});
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
    

  function handleInputChange(e,index){

    if (index === 5 ){
      document.getElementById(`input-${index}`).setAttribute("maxLength", 1)
        verify(getInputsValue()) 
    }

    document.getElementById(`input-${index}`).style.outlineColor="rgb( 0 0 0 / 0.7)";

    if (!Number(e.target.value+1)) {
       document.getElementById(`input-${index}`).style.outlineColor="red";
       return 
    }
     

    if (e.target.value === "") {
     
      document.getElementById(`input-${index-1}`)?.focus();

    } else if (e.target.value !== ""){
      document.getElementById(`input-${index+1}`)?.focus(); 
    }
     
  }

  return (
    <div className="two-factor-login-c" >
      <div className="two-factor-login-v-c">
        <h1>Two-factor Auth</h1>
        <p> Enter the code sent to your authenticator app.</p>
        <div className="two-factor-login-input-c">
          {Array.from({length: 6}).map((el, index)=> <input key={index}  type="text" id={`input-${index}`}
          onChange={(e)=> handleInputChange(e, index)} disabled={disableInput}  />)}
        </div>
        <Button disabled={disableInput} onClick={()=>verify(getInputsValue())}>Verify</Button>
      </div>
      
    </div>
  );
}
