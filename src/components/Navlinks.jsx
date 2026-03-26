import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence , motion as FramerMotion } from "framer-motion";


import "../styles/navlinks.css"

export default function Navlinks(){
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const timeOutRef = useRef(null);
    const location = useLocation();

     useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]); // Re-run when the hash part of the URL changes

    
   return [["Features","/#features"],
    ["Security","/#security"],
    ["Support","/#support"],
    ["About","/#about"],
    ].map(([label,href], index) => 
        <Link
            key={label}
            to={href}
            className="nav-links-link"
            onMouseEnter={()=>{
                if (timeOutRef.current) {
                    window.clearTimeout(timeOutRef.current);
                }

                setHoveredIndex(index);
            }}

            onMouseLeave={()=> {
                timeOutRef.current =  setTimeout(()=> {
                    setHoveredIndex(null);
                },200);
            }}
        >
            <AnimatePresence> 
                { hoveredIndex === index && (<FramerMotion.span
                    layoutId="hoverBackground"
                    className="nav-links-framer-motion-span"
                    initial={{opacity: 0}}
                    animate={{opacity: 0.1, transition: {duration: 0.15}}}
                    exit={{opacity: 0, transition: {duration: 0.15}}}
                >

                </FramerMotion.span>
                )
                }   
            </AnimatePresence>
            <span style={{position: "relative", zIndex:10}} >{label}</span>
        </Link>
    
)

}