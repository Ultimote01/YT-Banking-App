export default function Logo({styleSpan1,...props}) {
    return(
        <div className={"logo-container"} {...props} >
             <img src="/yabatech_logo.jpg" className="logo-container-img"/>
            <span className=" font-semibold text-xl py-[0.3rem] dark:text-white
            add-logo text-zinc-950 " style={styleSpan1?? {}}>YT Banking App</span>
            </div>
    )
}