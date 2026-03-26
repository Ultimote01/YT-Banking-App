import  {useNavigate} from "react-router-dom"


import Container from "./Container";
import Button from "./Button";
import "../styles/hero.css"




function ArrowIcon({className}) {
    return(
        <svg className={className} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L13 6M19 12L13 18"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
 
}

export default function Hero() {
    const navigate = useNavigate();
    return(
       <div className="hero-container">
        <Container>
            <div className="hero-box-wrapper">
                <div className="hero-box">
                    <h1 className="hero-box-h1">Banking made simple for everyone</h1>
                    <p className="hero-box-p">Experience the future of banking with our intuitive app.
                       Manage your money, track your expenses and acheive your financial goals with ease
                     </p>
                     <div className="hero-box-b-container">
                        <Button classname="hero-box-button" onClick={()=>navigate("/signup")}>Get Started  
                            <ArrowIcon className={"arrow-icon"}/>
                        </Button> 
                        <Button as={"accent"} classname="hero-box-button1">Learn More</Button>
                     </div>
                     <div className="hero-box-stats">
                        <div>
                            <h1>4.8</h1>
                            <p>App Store Rating</p>
                        </div>
                         <div>
                            <h1>2M+</h1>
                            <p>Active Users</p>
                        </div>
                         <div>
                            <h1>50+</h1>
                            <p>Countries</p>
                        </div>

                     </div>
                </div>
                <div className="hero-box1">
                        <img src="card-image.jpg" alt="Bank card image"></img>
                </div>
            </div>
        </Container>
       </div>
    )
}