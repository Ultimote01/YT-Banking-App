import { useEffect, useState } from 'react';

import DashboardLayout from '../components/DashboardLayout';
import { Avatar } from '../components/d-components/avatar';
import { Badge } from '../components/d-components/badge';
import { Divider } from '../components/d-components/divider';
import { Heading, Subheading } from '../components/d-components/heading';
import { getTransactions } from '../data/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/d-components/table';
import { createStringTitle } from '../util/helperFn';
import api from '../api/api';



export function Stat({ title, value, change }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}


function CloseButtonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /> 
  </svg>

  )
}
function Arrowpath({className}) {
  return(
   <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

  )
}
 
 
export default  function Home() {
    const [data, setData] = useState([]);
    const userObject = JSON.parse(localStorage.getItem("user"));
    const [notifications, setNotifications] = useState(userObject?.user?.notifications);
    const [isLoading, setIsLoading] = useState(false);
     
      

      useEffect(()=>{
          Promise.resolve(getTransactions())
          .then((data)=> setData(data));
      },[])

    
    async function handleNAction(route) {
       setIsLoading(true);
      try{
          const res = await api.get(route);
         
          setNotifications((notifications)=> 
          notifications.map((notification,index)=> {
            if (notification?.name === "email") {
                notification.message = res?.data?.message
                userObject.user.notifications = userObject?.user?.notifications.slice(index+1, notifications.length);
                localStorage.setItem("user", JSON.stringify(userObject));
                return notification
            }
          })
          )
           setIsLoading(false);
      /* eslint-disable-next-line */
      } catch(err){
        setIsLoading(false);
      }
    }
    
      
    function handleNotifications(pos){
    const ModifiedEl = notifications.filter((message , index)=> index !== pos );
    setNotifications(ModifiedEl);
    
  }
  


   
  return (
    <DashboardLayout user={userObject?.user} >
      { notifications?.map((notification, index)=> <div key={index} className='bg-[rgb(244,244,245,1)]   hidden gap-x-[2rem] w-[60%]   text-center py-[0.7rem] rounded-lg justify-center ml-[7rem] items-center mt-[-2rem] mb-[1rem] lg:ml-[15rem] lg:mt-[-1rem] lg:w-[50%] lg:flex dark:bg-zinc-800 dark:text-white' >
      {notification?.message}
      {notification?.action && <button  disabled={isLoading} className=" text-white text-[.82rem] bg-purple-500 px-[0.4rem] hover:cursor-pointer rounded-[6px] disabled:opacity-60 disabled:cursor-default" onClick={()=> handleNAction(notification?.action?.route)}>
        { isLoading? <Arrowpath className={" h-[1.3rem] w-[1.3rem] animate-spin"}  />  : notification?.action?.label}
      </button> }
      <i  className="bg-[rgb(244,244,245,1)]  hover:cursor-pointer dark:bg-zinc-800" onClick={()=> handleNotifications(index)}><CloseButtonIcon /></i></div>)
      }

      <Heading><span> Hello, {createStringTitle(userObject?.user?.firstName)}</span> <span style={{fontSize:"1rem"}}>Account No: {userObject?.user?.accountNumber}</span></Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Savings Account <p>Balance #{userObject?.user?.balance}</p> </Subheading>
         
      </div>
       
      <Subheading className="mt-14">Recent transaction</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Trans  Id</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader>Merchant</TableHeader>
            <TableHeader>Logo</TableHeader>
             <TableHeader>Transaction Type</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>

          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((tran) => (
            <TableRow key={tran.id} href={tran.url} title={`tran #${tran.id}`}>
              <TableCell>{tran.id}</TableCell>
              <TableCell className="text-zinc-500">{
                `${new Date(tran.transactionDate).toUTCString().split(" ")[4]}
                `
                }</TableCell>
              <TableCell>{tran.merchant}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img style={{width:"1.9rem", height:"1.9rem", borderRadius: "8px"}} src={tran.merchantLogo}></img>
                </div>
              </TableCell>
               <TableCell>{tran.transactionType}</TableCell>
              <TableCell className="text-right">#{tran.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  )
}
