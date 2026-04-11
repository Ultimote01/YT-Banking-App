import { Link, useNavigate} from "react-router-dom"
import { useEffect, useRef, useState } from "react"

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
let count = 0;
export default function  WhatsAppAuthLogin() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("none");
    const [errorMessage, setErrorrmessage] = useState('');
    const controller = new AbortController();
    const hasRun = useRef();
    const navigate  = useNavigate();


   const getOTPStatus =  async (res, waAuthObject, taskStatus)=>{

        try{
            const res1 = await api.post("/2fa/session-status-auth",{
                otp_session_id: res.data.otp_session_id,
                email: JSON.parse(waAuthObject).email
            },{signal: controller.signal});

            count++;
            console.log(count, res1.data);

            if (res1.data.status === "verified"){
                taskStatus.status = "end";
                localStorage.setItem("user", JSON.stringify(res1.data));
                localStorage.removeItem("waAuthObject");
                setStatus(res1.data.status);
                setTimeout(navigate("/", {replace: true}),2000)
               
               
                
            }else if ( res1.data.status === "error"){
                taskStatus.status = "end";
                setErrorrmessage(res1.data?.message);
                setStatus(res1.data.status);
                localStorage.setItem("2FA-Error",res1.data?.message.split(".")[0])
                localStorage.removeItem("waAuthObject");
                setTimeout(navigate("/login", {replace: true}), 2000)
         
            
            
            }
            
        /* eslint-disable-next-line */
        }catch(err){
            clearInterval( getOTPStatus);
            setErrorrmessage("Try Again");
            setStatus("error");
            taskStatus.status = "end";
           
        }

       
    }


  useEffect(()=> {
    
    

    async function handleWaAuth (){
         if (hasRun.current) return;
          hasRun.current =true

         const  waAuthObject = localStorage.getItem("waAuthObject");

         if (waAuthObject !== null && waAuthObject !== undefined) {

             try{
                const res = await api.post("/2fa/send-otp-auth", {
                        mobile_no: JSON.parse(waAuthObject).mobile_no,
                        country_code: JSON.parse(waAuthObject).country_code,
                        user_name: JSON.parse(waAuthObject).email.split("@")[0]
                    },{signal: controller.signal});

                    setData(res.data);
                   
                    

                    if (res.data.status === "success"){
                        
                        let taskStatus = {status: "begin"};
                        async function task(){
                            
                            await  getOTPStatus(res, waAuthObject, taskStatus);
                            if (taskStatus.status !== "end") setTimeout(task, 2000);
                            
                        }
                     
                        task();
                       

                    } else if ( res.data.status === "error"){
                        setErrorrmessage(res.data?.message);
                        setStatus(res.data.status);
         
                    }


                }catch(err){
                console.log(err)
                }
    
         }else{
            navigate("/", {replace: true})
         }
  

    } 
   handleWaAuth();

    
  },[])
 
    

    return (
        
          <div style={{display: "flex", flexDirection: "column", 
                 backgroundImage: "linear-gradient(to right bottom,  oklch(48.411% 0.22876 294.263 / 0.334) 30%, oklch(95.466% 0.00182 249.199 / 0.81) 70% ,oklch(95.466% 0.00182 249.199 / 0.81) 100%)"
                , minHeight: "100%", alignItems: "center" }}>

               

               <div style={{backgroundColor: "rgb(255 255 255 / 1)",borderRadius: "7px", marginTop: "4rem", minWidth: "20rem",
                 paddingLeft: "0.5rem",paddingright: "0.5rem",
                 paddingTop: "1.5rem",paddingBottom: "1.5rem",
                
                boxShadow: "0 1px 1px 1px  rgb(0 0 0 / 0.1), 0 1px 3px 1px  rgb(0 0 0 / 0.05) "
               }}> 
                  <h1 style={{fontSize: "1.8rem", lineHeight: "2rem", fontWeight: "800",transform: "translateX(9px)",
                    color: "rgb(81, 78, 78)", marginBottom: "2rem",textAlign:'center', maxWidth: "20rem"
                  }}>WhatsApp Two-Factor Authentication </h1>
                
                <div style={{minWidth: "20rem", marginLeft: "3rem"}}>

                <div className="wa-setup-auth-phone-c"> 
                <PlaceholderFrame style={{width: "100%", height:"100%", 
                position: "absolute", zIndex: "10", stroke: "rgb(0, 0, 0)"}}/>

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
                style={{color: "rgb(89, 87, 97)", paddingLeft: "0.3rem", textDecoration: "underline", fontSize: "1.1rem"}}
                >
                click</Link> to get OTP</p>
                  </div>
                </div>
                </div>
                
    )
}