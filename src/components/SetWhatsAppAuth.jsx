import { Link} from "react-router-dom"
import { useState } from "react"


 
import Button from "./Button"
import "../styles/setwhatsappauth.css"
import api from "../api/api"
 

function SuccessExp({...props}){
    return (
        <div> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} viewBox="0 0 24 24" strokeWidth={1.5} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

        </div>
    )
}

function ErrorExp({errorMessage,...props}){
    return(
        <div style={{display:"flex", flexDirection: "column", padding: "0 1rem",
        alignItems: "center",justifyContent: "center"}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props} viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
            <h5 style={{fontSize: "0.7rem", lineHeight: "1rem", color:"red", textAlign: "center"}}>
            {errorMessage? errorMessage: ""}</h5>
        </div>
    )
}




function PlaceholderFrame({...props}){
    return(
        <svg viewBox="0 0 366 729" aria-hidden="true" {...props}>
        <path
            fill="#F2F2F2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M300.092 1c41.22 0 63.223 21.99 63.223 63.213V184.94c-.173.184-.329.476-.458.851.188-.282.404-.547.647-.791.844-.073 2.496.257 2.496 2.157V268.719c-.406 2.023-2.605 2.023-2.605 2.023a7.119 7.119 0 0 1-.08-.102v394.462c0 41.213-22.001 63.212-63.223 63.212h-95.074c-.881-.468-2.474-.795-4.323-.838l-33.704-.005-.049.001h-.231l-.141-.001c-2.028 0-3.798.339-4.745.843H66.751c-41.223 0-63.223-21.995-63.223-63.208V287.739c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 284.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-16.289c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 214.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-26.041a2.26 2.26 0 0 0 .093-.236l-.064-.01a3.337 3.337 0 0 1-.72-.12l-.166-.028A2 2 0 0 1 1 135.62v-24.611a2 2 0 0 1 1.671-1.973l.857-.143v-44.68C3.528 22.99 25.53 1 66.75 1h233.341ZM3.952 234.516a5.481 5.481 0 0 0-.229-.278c.082.071.159.163.228.278Zm89.99-206.304A4.213 4.213 0 0 0 89.727 24H56.864C38.714 24 24 38.708 24 56.852v618.296C24 693.292 38.714 708 56.864 708h250.272c18.15 0 32.864-14.708 32.864-32.852V56.852C340 38.708 325.286 24 307.136 24h-32.864a4.212 4.212 0 0 0-4.213 4.212v2.527c0 10.235-8.3 18.532-18.539 18.532H112.48c-10.239 0-18.539-8.297-18.539-18.532v-2.527Z"
        />
      <rect x="154" y="29" width="56" height="5" rx="2.5" fill="#D4D4D4" />
    </svg>
    )
}


export default function  SetWhatsAppAuth({setOpen, method, setOpenMethod,setUserObject}) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("none");
    const [userNumber, setUserNumber] = useState();
    const [errorMessage, setErrorrmessage] = useState('');

     console.log("Function call",status);


  

    async function handleWASetup (countryCode, number){
            let scopeStatus ='none';
    
            const getOTPStatus = setInterval(async ()=>{
                const resList = [ "error", "verified"]
                
 
                try {
                     if (!resList.includes(scopeStatus)){
                    const res = await api.get("/2fa/session-status");
                    console.log(res.data);


                    if (resList.includes(res.data.status)) {
                      console.log("Session ended",scopeStatus)
                        if (res.data.status === "verified"){

                            const activeUser = JSON.parse(localStorage.getItem("user"));
                            const signOutUpdate = JSON.parse(localStorage.getItem("signOutUpdate"));

                            if (signOutUpdate !== null && signOutUpdate !== undefined) {

                                if (signOutUpdate?.twoFAmethods !== undefined){
                                const twoFAExistSN = signOutUpdate.twoFAMethods.some((el)=> {
                                    if (el.name === method) return true;
                                    return false;
                                })

                                    if (!twoFAExistSN) signOutUpdate.user.twoFAMethods.push({
                                        name: method,
                                        preferred: false
                                    })
                                } else if (signOutUpdate?.twoFAMethods === undefined){
                                    signOutUpdate.twoFAMethods = [].push({
                                        name:method,
                                        preffered: false
                                    })
                                }
                                localStorage.setItem("signOutUpdate", JSON.stringify(signOutUpdate));
                            }else if (signOutUpdate === null || signOutUpdate === undefined) {
                                localStorage.setItem("signOutUpdate", JSON.stringify({
                                    twoFAMethods: [{
                                        name:method,
                                        preferred: false
                                }]
                                }))
                            }
                             
                                const twoFAExist = activeUser.user.twoFAMethods.some((el)=> {
                                if (el.name === method) return true;
                                return false;
                                })

                                if (!twoFAExist) activeUser.user.twoFAMethods.push({
                                    name: method,
                                    preferred: false
                                })

                               
                                localStorage.setItem("user", JSON.stringify(activeUser));
                                setUserObject(activeUser)
                                setOpen(false);
                                setOpenMethod("");

                                }
                        if (res.data.status === "error") setErrorrmessage(res.data?.message);
                        clearInterval(getOTPStatus);
                    }

                    scopeStatus = res.data.status;
                    setStatus(res.data.status);
                }
                }catch(err){
                    console.log(err);
                    clearInterval(getOTPStatus);
                }
 
            }, 2000); 

            if (scopeStatus && scopeStatus !== "pending"){
                 
                try{
                    const res = await api.post("/2fa/send-otp", {
                        phone: number,
                        countryCode
                    });
                     console.log(res)
                    setData(res.data);

                }catch(err){
                    console.log(err)
                }
            }


           const cancelButton =document.getElementById("wa-setup-cancel-button");
            cancelButton.setAttribute("data-closeInterval", getOTPStatus);
    } 
        

    
    

    return (
        <div className="wa-setup-auth-c" id="wa-setup-auth-c">
                <hr  style={{marginLeft: "0.1rem",marginBottom: "1rem",
                    marginTop: "-0.5rem"
                }}/>
                {!userNumber && <div className="wa-setup-auth-number-c">
                    <form> 
                    <h2>Enter number to register for WhatsApp 2FA </h2>
                    <div className="wa-setup-auth-input-c"> 
                        <select id="wa-setup-country-code" >
                        {[ [["+234","Nigeria"]],
                        [["+233", "Ghana"]],
                        [["+225", "Ivory Coast"]], 
                        [["+243", "DRC"]]].map(([code], index)=> 
                            <option value={code[0]} key={index}>{code[0]}</option>
                        )}
                        </select>
                        <input type="text" id="wa-setup-phone-input" maxLength={15}/>

                        <Button onClick={(e)=> {

                        e.preventDefault();
                        const countryCode = document.getElementById("wa-setup-country-code").value?.replace("+", "");
                        let number = document.getElementById("wa-setup-phone-input").value;
                        number = number.startsWith("0") ? number.slice(1) : number; 

                        if (Number(number)){
                            document.getElementById("wa-setup-auth-c").
                            setAttribute("data-userno", `${countryCode},${number}`);
                            setUserNumber(number);
                            handleWASetup(countryCode,number);
                        }
                         
                        }
                        }>Activate</Button>

                    </div>
                     <Button onClick={()=> {setOpen(false), setOpenMethod('')}}>Cancel</Button>
                     </form>
                </div>}

                { userNumber && <>
                <div className="wa-setup-auth-phone-c"> 
                <PlaceholderFrame style={{width: "100%", height:"100%", position: "absolute", zIndex: "10"}}/>

                <div style={
                    {position:"absolute",
                    display: "flex",alignItems: "center", justifyContent: "center",
                    width: "calc(205/366*100%)", height: "calc(425/450*100%)",
                    left:"calc(80/366*100%)", top: "calc(13/450*100%)"
                    }}
                    >
                    {status === "verified" && <SuccessExp className="wa-setup-success-exp" />}

                    {status === "error" && <ErrorExp className="wa-setup-err-exp" errorMessage={errorMessage?? <span>Error Occurred<br/>Try Again</span>} />}
                     
                    
                  { status !== "verified" && status !== "error" &&
                    <img style={{width: "10rem", height: "10rem"}} src={data?.qrCode} alt=""/>}
                    
                </div>

                </div>
                 
                <p style={{marginTop: "1rem", fontSize: "0.9rem", lineHeight: "1.2rem",
                    marginLeft: "1rem"
                }}>
                Scan QR code or
                <Link to={data?.intent} target="_blank"
                style={{color: "rgb(205, 199, 242)", paddingLeft: "0.3rem", textDecoration: "underline", fontSize: "1rem"}}
                >
                click</Link> to get OTP</p>
                
                 

                {setOpen &&<div> <Button  id="wa-setup-cancel-button"
                style={{maxWidth: "5rem", marginTop: "1rem",marginLeft: "1rem",
                    paddingTop: "0.2rem", paddingBottom: "0.2rem",
                    backgroundColor: "rgb(240 35 25 / 1)",color: "oklch(96.8% 0.00409 285.927)"
                }}

                onClick={()=> {
                     setOpen(false); setOpenMethod("");
                     
                     if (document.getElementById("wa-setup-cancel-button").dataset.closeinterval){
                        clearInterval(document.getElementById("wa-setup-cancel-button").dataset.closeinterval);
                     }

                    }}
                >Cancel</Button> 
                
                { status == "error" && <Button 

                id="wa-setup-try-again-button"

                style={{maxWidth: "6.2rem", marginTop: "1rem",marginLeft: "1rem",
                    paddingTop: "0.2rem", paddingBottom: "0.2rem",
                    backgroundColor: " rgb(48, 24, 235)",color: "oklch(96.8% 0.00409 285.927)"

                }}
                onClick={()=>{
                     const phoneNo =  document.getElementById("wa-setup-auth-c").dataset.userno.split(",");
                    setStatus("none");
                    handleWASetup(
                         phoneNo[0],
                         phoneNo[1]
                    );
                        
                }}
                >Try Again</Button>} </div> }
                 </>
                }
        </div>
    )
}