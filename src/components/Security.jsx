import Container from "./Container";
import "../styles/security.css"



function SheildIcon({className}) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className={className}  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
    )
}
function LockIcon ({className}){
   return( <svg xmlns="http://www.w3.org/2000/svg"  className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
   )
}

function VisiionIcon() {
   return( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
    <circle cx="12" cy="12" r="3"></circle></svg>
   )
}


function CheckIcon() {
    return( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path>
    </svg>
    )
}


export default function Security(){
    return(
        <section id="security">
            <Container classname={"security-container"}>
            <div className="security-box"> 
            
                    <div className="security-info">
                        <div className="security-info-top-div">🔒 Security First</div>
                        <h1>Your security is our top priority</h1>
                        <p>We use industry-leading security measures to protect your money and personal information.
                         Rest easy knowing your finances are in safe hands.</p>

                        <div className="security-info-middle-div">
                            <div className="lock-icon-c">
                             <LockIcon/>
                             </div>

                             <div className="security-info-middle-div-box">
                             <h4>256-bit Encryption</h4>
                             <p>Military-grade encryption protects your data at all times</p>
                             </div>

                        </div>
                        <div className="security-info-middle-div1">
                            <div className="vision-icon-c "> 
                            <VisiionIcon/>
                            </div>

                            <div className="security-info-middle-div-box1"> 
                            <h4>Biometric Authentication</h4>
                            <p>Face ID and fingerprint login for secure access</p>
                            </div>

                            </div>
                        <div className="security-info-middle-div2">
                            <div className="check-icon-c">
                            <CheckIcon/>
                            </div>

                            <div className="security-info-middle-div-box2">
                            <h4>FDIC Insured</h4>
                            <p>Your deposits are insured up to $250,000. </p>
                            </div>
                            </div>
                    </div>
                <div className="security-image">
                    <div className="security-image-box">
                        <LockIcon className="security-image-box-svg"/>
                        <h6 className="security-image-box-h6">100%</h6>
                        <p className="security-image-box-p">Secure & Protected</p>

                      <div className="security-image-box1">
                        <SheildIcon/>
                        <div>
                        <h6>Protected</h6>
                        <p>FDIC Insured</p>
                        </div>
                    </div>

                    <div className="security-image-box2">
                        <CheckIcon/>
                        <div>
                        <h6>Verified</h6>
                        <p>Licenced bank</p>
                    </div>
                    </div> 

                    </div>
            </div>
            </div>
            </Container>
        </section>
    )
}