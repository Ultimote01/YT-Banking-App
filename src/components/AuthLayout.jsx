import { Link } from "react-router-dom"

import "../styles/authlayout.css"

export default function AuthLayout({children}) {
    return (

    <div  className="auth-layout-wrapper"> 
    <div className="auth-layout-container">
    <div className="auth-layout-card">
        {children}
    </div>
    </div>

    <div className="signup-box1">
        <span> &copy; 2026 Yabatech Bank. All rights reserved 
        <i></i><Link>Terms of use</Link> 
        <i></i><Link>Privacy Policy</Link> 
        </span>
    </div> 


    </div >
    
    )
}