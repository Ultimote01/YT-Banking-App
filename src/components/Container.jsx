import clsx from "clsx"


import "../styles/container.css"


export default function Container({classname, ...props}){
    return(
        <div className={clsx("container", classname)} {...props} />
    )
}