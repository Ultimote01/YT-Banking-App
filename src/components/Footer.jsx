import { Link } from "react-router-dom";


import Container from "./Container";
import "../styles/footer.css"
 

function InstagramIcon() {
   return( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
   )
}

function FacebookIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
    )
}

function TwitterIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
    )
}

function LinkedIn(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
        </svg>
    )
}

const footerLinks = [["Product",["Features","Security","Pricing","Downloads"]],
                    ["Company",["About","Careers","Press","Blog"]],
                    ["Resources",["Help Center", "Contact", "FAQ", "Terms"]],
                    ["Legal",["Privacy", "Compliance", "Licences","T&C"]]
                    ]

export default function Footer() {
    return(
        <footer>
            <Container className={"footer-contanier"}>
                <div className="footer-top-c">
                    <div className="footer-top-box">
                        <div className={"f-logo-container"}>
                                <img src="/yabatech_logo.jpg" className="logo-container-img"/>
                                <span className="f-logo-container-span1">YT Banking App</span>
                            </div>
                         
                            <h4>Making banking simple and affordable to everyone.
                                Join millions of users worldwide
                            </h4>

                        <div className="f-social-icon-c">
                            <Link><FacebookIcon/></Link>
                            <Link><InstagramIcon/></Link>
                            <Link><TwitterIcon/></Link>
                            <Link><LinkedIn/></Link>
                        </div>
                    </div>
                    {footerLinks.map(([heading,children],index)=> 
                    <div className={`footer-top-box${index}`} key={heading}>
                        <h4>{heading}</h4>
                        {children.map((text,index)=><p key={index}>{text}</p>)}
                    </div>
                    )}

                </div>
                <div className="footer-bottom-c">
                    <div className="footer-bottom-box">
                        &copy; 2026  Yabatech Bank . All rights reserved
                    </div>
                    <div className="footer-bottom-box1"> 
                        <Link>Privacy Policy</Link>
                        <Link>Terms of Service</Link>
                        <Link>Cookie Policy</Link>
                    </div>

                </div>
            </Container>
        </footer>
    )
}