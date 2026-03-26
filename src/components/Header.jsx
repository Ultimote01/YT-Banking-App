import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {Popover, PopoverBackdrop, PopoverButton, PopoverPanel} from "@headlessui/react";
import { AnimatePresence,  motion as FramerMotion } from "framer-motion";

import Container from "./Container";
import Navlinks from "./Navlinks";
import Button from "./Button";
import "../styles/header.css"
 


function MenuIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M5 6h14M5 18h14M5 12h14"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  
  function ChevronUpIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M17 14l-5-5-5 5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }


  function MobileNavlinks({children,...props}){
    
    return (
        <PopoverButton
         
            as={Link}
            className={"mobile-nav-links"}
            {...props}
        >
            {children}
        </PopoverButton>
    )
  }




export default function Header({className}){
  const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [location]); // Re-run when the hash part of the URL changes

    return(
        <header className={className}>
            <nav>
                <Container classname="header-container">
                    <div className="logo-nav-div">
                        <Link to="/" aria-label="Home">
                            <div className={"logo-container"}>
                                <img src="/yabatech_logo.jpg" className="logo-container-img"/>
                                <span className="logo-container-span1">YT Banking App</span>
                            </div>
                        </Link>
                         <div className="nav-links-container">
                            <Navlinks/>
                        </div>
                    </div>
                    <div className="mob-nav-links-auth-container">
                    <Button as={"accent"} onClick={()=> {navigate("/login")}} classname="button-sign-in">Sign In</Button>
                    <Button onClick={()=> {navigate("/signup")}} classname={"button-signup"} >Get Started</Button>
                        <Popover className={"header-popover"} >
                            {({open})=> (<>
                                <PopoverButton className={"header-popover-button"} aria-label="Toggle site navigation">
                                    {({open})=> open?(<ChevronUpIcon className="header-chevronup-icon"/>) : 
                                    (<MenuIcon className="header-menu-up-icon"/>) }
                                </PopoverButton>

                                <AnimatePresence>
                                    { open && (
                                        <> 
                                        <PopoverBackdrop
                                            static
                                            as={FramerMotion.div}
                                            className={"header-popover-backdrop"}
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            /> 
                                            <PopoverPanel
                                             static
                                             className={"header-popover-panel"}
                                             as={FramerMotion.div}
                                             initial={{opacity: 0 , y: -32}}
                                             animate={{opacity: 1, y: 0}}
                                             exit={{opacity:0 , y: -32, transition:{duration: 0.2}}}
                                            >   
                                                <>
                                                 <div className="mobile-nav-logo">
                                                <Link to="/" aria-label="Home">
                                                <div className={"logo-container"}>
                                                   <img src="/yabatech_logo.jpg" className="logo-container-img"/>
                                                    <span className="logo-container-span1 logo-adds1"> YT Banking App</span>
                                                </div>
                                                </Link>
                                                </div>
                                                
                                                <div className="mobile-nav-container">
                                                    {[["Features","/#features"],
                                                        ["Security","/#security"],
                                                        ["Support","/#support"],
                                                        ["About","/#about"],
                                                        ].map(([label,href], index) =>
                                                     <MobileNavlinks
                                                        key={index}
                                                        to={href}
                                                     >
                                                        {label}
                                                     </MobileNavlinks>)}
                                                </div>
                                                <div className="mobilenav-button-container">
                                                    <Button onClick={()=> {navigate("/login")}}>Sign In</Button>
                                                     <Button as={"accent"} onClick={()=> {navigate("/signup")}} classname={"mobile-signup-button"}>Get Started</Button>
                                                </div>
                                                </>
                                            </PopoverPanel>
                                        
                                        </>
                                    )}
                                </AnimatePresence>

                            </>)}

                        </Popover>
                    </div>
                </Container>
            </nav>
        </header>
    )
}