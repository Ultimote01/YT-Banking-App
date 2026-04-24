import Container from "./Container";

export default function About() {
 return (
    <section>
        <div style={{background: "linear-gradient(to right bottom, oklch(100% 0.00011 271.152 / 0.81) 0%, oklch(100% 0.00011 271.152 / 0.81) 60%, oklch(48.411% 0.22876 294.263 / 0.334) 100%)",
           
        }}
        className="p-[16px]"
        >
        <div className="flex flex-col justify-between lg:flex-row">
            <div className="px-[16px] py-[2rem]">
                <h1 className="text-[1.5rem] mb-[1rem] font-semibold">Our Story</h1>
                <div> 
                <p>
                It started with a simple question: Why does banking feel like a chore?
                We looked at the legacy banking system—hidden fees, confusing jargon, 
                long branch lines, we wanted to build a financial partner that fits in your pocket, and understands your goals.
               </p>
               <p className="mt-[1rem] lg:mt-[3rem]"><strong>YT Banking App </strong> was born to eliminate the anxiety from money management and replace it with empowerment. 
               We are a team of technologists, designers, and financial experts obsessed with making your financial life effortless.
               </p>
               </div>
            </div>
            <div className="px-[16px] py-[2rem]">
                <div>
                     <h1 className="text-[1.5rem] mb-[1rem] font-semibold">Our Mission</h1>
                     <p>To empower everyone to take control of their financial future.
                        We believe banking should be transparent, accessible, and—dare we say—fun.
                        By leveraging cutting-edge technology and human-centric design, 
                        we are rewriting the rules of finance to serve you better.</p>
                </div>
                <div className="hidden justify-end mt-[1rem] lg:flex">
                        <img className="rounded-md" src="about-us.jpg"/>
                </div>
            </div>
        </div>
        </div>
        
    </section>
 )
}