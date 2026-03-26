import Container from "./Container";
import "../styles/features.css"

function CardIcon({className}) {
   return(<svg xmlns="http://www.w3.org/2000/svg" className={className}  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
        <line x1="2" x2="22" y1="10" y2="10"></line>
        </svg>
   )
}

function LightingIcon({className}) {
   return ( <svg xmlns="http://www.w3.org/2000/svg" className={className}   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
    </svg>
   )
}

function SheildIcon({className}) {

    return(
        <svg xmlns="http://www.w3.org/2000/svg" className={className}  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
    )
}


function BudgetIcon({className}) {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className={className}  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
        </svg>
    )
}



function AlertIcon({className}) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className}  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326">
            </path>
        </svg>
    )
}

function GlobalIcon({className}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className={className}  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path></svg>
    )
}

const features = [ 
                 ["Smart Cards", "Virtual and physical cards with real-time spending controls and instant notifications.",CardIcon],
                 ["Budget Tracking", "Automatically categorize expenses and track your spending with intuitive charts.", BudgetIcon],
                 ["Bank Level Security", "256-bit encryption and biometric authentication keep your money safe.", SheildIcon],
                 ["Instant Transfers","Send and receive money instantly to friends, family, or businesses.",LightingIcon],
                 ["Global Access", "Use your account anywhere in the world with competitive exchange rates.", GlobalIcon],
                 ["Sms Alerts", "Get notified about important account activity and spending insights.", AlertIcon]
                ]



export default function Features () {
 return(
    <section className="features-section" id="features">
        <Container classname={"features-container"} >
            <div className="features-box">
                <h1> Everything you need to manage your money</h1>
                <p>Powerful features designed to make banking, simple, secure, and accessible for everyone</p>

            </div>
            <div className="features-box1-l-c"> 
                {/*eslint-disable-next-line */}
                {features.map(([heading,text,Icon],index)=>
                <div className="features-box1" key={index}> 
                    <div className="features-box1-icon-c">
                        <Icon className={"features-box1-icon"}/>
                    </div>
                    <h3>{heading}</h3>
                    <p>{text}</p>
                 </div> ) }
                </div>
                 
            
        </Container>
    </section>
 )
}