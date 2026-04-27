import { Link } from "react-router-dom";


function MagnifyingGlass({className}) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>

  )
}

export default function Support() {
    return (
        <section>
            
             <div style={{backgroundImage: "linear-gradient(to right ,  oklch(31.64% 0.180 288.08) 0%)"}
            } 
            className="flex items-center justify-center pt-[7rem] pb-[3rem] mt-[0.05rem]"
            >
              <div className="flex flex-col items-center"> 
              <h1 className=" text-white pb-2 tracking-wider text-x lg:text-2xl">Hi, how can we help you?</h1>
              <form className="bg-white py-[0.7rem] px-[2rem]  flex items-start rounded-3xl lg:px-[10rem]">
                <MagnifyingGlass className={"size-6 pr-1 lg:ml-[-9rem]"}/>
                <input className="bg-white text-black  " placeholder="search using keywords..."/>
              </form>
               <nav className=" pt-1 text-[0.5rem] text-white mt-1 lg:text-[0.7rem]">
                    <Link className="mr-2 py-1 px-2 bg-[rgba(135,76,223,0.29)] rounded-[4px] ">Reverse OTP</Link>
                    <Link className="mr-2 py-1 px-2 bg-[rgba(135,76,223,0.29)] rounded-[4px] ">Google Authenticator</Link>
                </nav>
                </div>
                </div>
                <div className="py-[7.5rem]">
                </div>
          
            
        </section>
    )
}