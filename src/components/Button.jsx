import clsx from "clsx";

import "../styles/button.css"

export default function Button({classname, as ,children, ...props}) {
   
   return( <button className={clsx(classname,"button", as === "accent"? "button-accent": "")} {...props} >
    {children}
   </button>

   );
}