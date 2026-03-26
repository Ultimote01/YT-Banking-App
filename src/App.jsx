import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TwoFactorLogin from "./pages/TwoFactorLogin";
// import Dashboard from "./pages/Dashboard";
import Setup2FA from "./pages/Setup2FA";
import Signup from "./pages/Signup";
import NotFound from "./pages/notFound";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Verify from "./pages/Verify";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/2fa" element={<TwoFactorLogin />} />
        <Route path="/authentication" element={<Authentication/>}/>
        <Route path="/setup-2fa" element={<Setup2FA />} />
        <Route path="/verify/:id" element={<Verify/>}></Route>
        <Route path="/authenticator/:app" element={<TwoFactorLogin/>}></Route>
        <Route path="*" element={< NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
