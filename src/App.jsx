import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import GoogleAuthLogin from "./pages/GoogleAuthLogin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Verify from "./pages/Verify";
import WhatsAppAuthLogin from "./pages/WhatsAppAuthLogin";
import { useEffect } from "react";

export default function App() {

useEffect(()=> {
  navigation.addEventListener('navigate', (event) => {
  console.log('User is navigating to:', event.destination.url);
});

})


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/authentication" element={<Authentication/>}/>
        <Route path="/verify/:id" element={<Verify/>}></Route>
        <Route path="/app-authentication/" element={<GoogleAuthLogin/>}/>
        <Route path="wa-authentication/" element={<WhatsAppAuthLogin/>}/>
        <Route path="*" element={< NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
