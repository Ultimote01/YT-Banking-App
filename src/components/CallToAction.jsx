import Container from "./Container";
import Button from "./Button";


import "../styles/calltoaction.css"

function AppleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#313131" stroke="" stroke-width="0" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
        <path d="M10 2c1 .5 2 2 2 5"></path>
        </svg>
    )
}

function AndroidIcon(){
    return(
        <svg width="25" height="25" viewBox="0 0 1024 1024" fill="#313131"   version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M213.696 348.032c-28.16 0-51.2 23.04-51.2 51.2V604.8c0 28.096 23.04 51.2 51.2 51.2s51.2-23.04 51.2-51.2V399.168c0-28.16-23.04-51.136-51.2-51.136z" />
        <path d="M213.696 633.6a28.8 28.8 0 0 1-28.8-28.8V399.168a28.8 28.8 0 0 1 57.6 0V604.8a28.8 28.8 0 0 1-28.8 28.8z" />
        <path d="M831.68 348.032c-28.16 0-51.2 23.04-51.2 51.2V604.8c0 28.096 22.976 51.2 51.2 51.2s51.2-23.04 51.2-51.2V399.168a51.2 51.2 0 0 0-51.2-51.136z"/>
        <path d="M831.68 633.6a28.8 28.8 0 0 1-28.8-28.8V399.168a28.8 28.8 0 0 1 57.6 0V604.8a28.8 28.8 0 0 1-28.8 28.8z" />
        <path d="M294.656 709.184c0 24.64 20.16 44.8 44.8 44.8h43.008v116.8c0 28.096 23.04 51.2 51.2 51.2s51.2-23.04 51.2-51.2v-116.8h81.6v116.8c0 28.096 22.976 51.2 51.2 51.2s51.2-23.04 51.2-51.2v-116.8h38.976c24.64 0 44.8-20.16 44.8-44.8V348.032H294.656v361.152z" />
        <path d="M617.664 899.648a28.8 28.8 0 0 1-28.8-28.8v-139.2H462.464v139.2a28.8 28.8 0 0 1-57.6 0v-139.2H339.52a22.4 22.4 0 0 1-22.4-22.464V370.432h413.184v338.752a22.4 22.4 0 0 1-22.4 22.464h-61.376v139.2c0 15.808-12.992 28.8-28.864 28.8z"  />
        <path d="M297.92 320h451.52a225.28 225.28 0 0 0-113.28-163.456l51.712-51.712a11.328 11.328 0 0 0 0-15.808h-0.064a11.2 11.2 0 0 0-15.808 0l-52.032 52.096c-1.728 1.664-2.24 3.968-2.624 6.144A219.456 219.456 0 0 0 528.704 128h-10.048c-27.52 0-53.824 5.184-78.208 14.4-0.256-0.384-0.128-0.96-0.448-1.28l-52.096-52.096a11.2 11.2 0 0 0-15.808 15.808l47.488 47.552A225.088 225.088 0 0 0 297.92 320z m325.376-120.768a25.984 25.984 0 1 1 0 51.904 25.984 25.984 0 0 1 0-51.904z m-197.952 0a25.984 25.984 0 1 1 0 51.904 25.984 25.984 0 0 1 0-51.904z"/>
        <path d="M325.568 297.6a202.88 202.88 0 0 1 55.296-91.456 48.448 48.448 0 1 0 38.592-28.928 197.696 197.696 0 0 1 99.2-26.816h9.984c35.648 0 69.568 9.664 98.944 26.624a48.448 48.448 0 1 0 41.024 31.04c24.768 24.256 43.392 54.912 53.184 89.472H325.568z"  /></svg>
    )
}

function ArrowIcon({className}) {
    return(
        <svg className={className} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L13 6M19 12L13 18"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
 
}

export default function CallToAction (){
    return(
       <section>
        <Container className={"call-to-action-c"}>
            <div className="call-to-action-box-c"> 
            <div className="call-to-action-box"></div>
            <div className="call-to-action-box1">
                   <h1>Ready to take control of your finances?</h1>
                   <p>Join millions of users who trust us with their money.
                    Get started in a minutes with no hidden fees
                   </p>
                   <div className="call-to-action-b-c"> 
                   <Button>
                    <AppleIcon/> Download for iOS
                   </Button>
                    <Button>
                        <AndroidIcon/>Download for Android
                    </Button>
                    
                    </div>
                    <div className="call-to-action-bottom-c">
                        <div style={{display:"flex"}}>
                            <div><ArrowIcon/></div>
                            <span>No credit check required</span>
                            </div>
                        <div style={{display:"flex"}}>
                            <div><ArrowIcon/></div>
                            <span>No monthly fees</span>
                        </div>
                        <div style={{display:"flex"}}>
                            <div><ArrowIcon/></div>
                            <span>Setup in 5 minutes</span>
                        </div>
                    </div>
            </div>
            </div>
        </Container>
       </section>
    )
}