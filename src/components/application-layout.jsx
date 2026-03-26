
import { Avatar } from './d-components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from './d-components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from './d-components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from './d-components/sidebar'
import { SidebarLayout } from './d-components/sidebar-layout'

import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  ArrowPathIcon,
  LockClosedIcon
} from '@heroicons/react/20/solid'
import { useLocation, useNavigate } from "react-router-dom";
import clsx from 'clsx'
import {  useState } from 'react'


import Logo from './Logo'
import { createStringTitle } from '../util/helperFn'
import api from "../api/api";
 


function EnvelopeIcon ({...props}){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

  )
}

function NotificationAction ({label, route, handleNAction}) {
  return(
      <span  className={"hover:cursor-pointer"}style={{marginLeft: "1.25rem", backgroundColor: "oklch(62.7% 0.265 303.9)", borderRadius:"5px", 
        fontSize:"0.7rem", padding:"0.2rem 0.25rem"}} 
      onClick={()=> handleNAction(route)}>
          {label} 
      </span>
  )
}


function NotificationDropDownMenu({anchor, notifications, handleNotifications, handleNAction}){

  return (
    
    <DropdownMenu className="min-w-62 " anchor={anchor}>
      { notifications.map((notification,index)=><DropdownItem key={index}
      onClick={()=> handleNotifications(index)}
      className={"text-center hover:default hover:bg-stone-800"} focusValue={"none"} >

        <DropdownLabel>{notification.message}
          {notification.action && <NotificationAction label={notification.action.label} 
          route={notification.action.route} handleNAction={handleNAction}  />  }
        </DropdownLabel>  

      </DropdownItem> )
      }
        
    </DropdownMenu>
  )
}



function AccountDropdownMenu({ anchor , handleSignOut,route}) {
  
 
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/" >
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel onClick={()=> handleSignOut(route)}>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}
 
export function ApplicationLayout({ user, children }) {
  const [notifications, setNotifications] = useState(user.notifications);
  const navigate = useNavigate(); 
  const location = useLocation();



  async function handleSignOut () {

     try{
        const signOutUpdate= localStorage.getItem("signOutUpdate");
        if (signOutUpdate !== null && signOutUpdate !== undefined) {
           await api.post("auth/logout",  JSON.parse(signOutUpdate));
           localStorage.removeItem("signOutUpdate");
           localStorage.removeItem("user");
           if (location.pathname !== "") {
            navigate("/", {replace: true});
           } 
           navigate(0);
          }
        


        localStorage.removeItem("user");
       if (location.pathname !== "") {
            navigate("/", {replace: true});
           } 
           navigate(0);
           
    /* eslint-disable-next-line */
    }catch(err) {}
  }




  async function handleNAction(route) {

    
    try{
      
      await api.get(route);
    
    /* eslint-disable-next-line */
    } catch(err) {}
    
  }


  function handleNotifications(pos){
    const ModifiedEl = notifications.filter((message , index)=> index !== pos );
    setNotifications(ModifiedEl);
    
  }



  

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown >
              <DropdownButton className= { clsx(`text-blue-600 after:content-['${notifications.length > 0 ? notifications.length : ""}']  after:absolute
              after:-top-[4px] after:right-[2px] after:text-sm after:text-indigo-200`)}
              as={NavbarItem}>
                <EnvelopeIcon/>
              </DropdownButton>
              { notifications.length >= 1 && 
              <NotificationDropDownMenu notifications={notifications}
              handleNotifications={handleNotifications}
               setNotifications={setNotifications} handleNAction={handleNAction} anchor="bottom end" />
              }
            </Dropdown>
              

            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="default.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu  handleSignOut={handleSignOut} route={"/auth/logout"}    anchor="bottom end" />
            </Dropdown>
          
          </NavbarSection>
          
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Logo/>
                <SidebarLabel></SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
                  <DropdownLabel>Tech Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem to="/" >
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem to="/" >
                <ArrowPathIcon />
                <SidebarLabel>History</SidebarLabel>
              </SidebarItem>
              <SidebarItem to="/authentication" >
                <LockClosedIcon />
                <SidebarLabel>Authentication</SidebarLabel>
              </SidebarItem>
              <SidebarItem to="/" >
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

             

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar src="/default.jpg" className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{createStringTitle(user?.firstName)}</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user?.email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu  handleSignOut={handleSignOut} route={"/auth/logout"}  anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
      
    </SidebarLayout>
  )
}
