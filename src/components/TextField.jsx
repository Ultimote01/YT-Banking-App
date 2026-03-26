import clsx from "clsx"

import "../styles/textfield.css"

export default function TextField({className, ...props}) {

    return <input className={clsx("text-field", className)} {...props}/>
}