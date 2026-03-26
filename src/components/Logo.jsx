export default function Logo({styleSpan1,...props}) {
    return(
        <div className={"logo-container"} {...props} >
             <img src="/yabatech_logo.jpg" className="logo-container-img"/>
            <span className="logo-container-span1 add-logo" style={styleSpan1?? {}}>YT Banking App</span>
            </div>
    )
}