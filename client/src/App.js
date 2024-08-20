import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import Home from "./views/Home";
import "./css/responsive.css"
import "./css/style.css"
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";
import ForgotPassword from "./views/Auth/ForgotPassword";
import ResendVerification from "./views/Auth/ResendVerification";
import 'react-toastify/dist/ReactToastify.css';
import Success from "./views/Auth/Success";
import ResetPassword from "./views/Auth/ResetPassword";
import Dashboard from "./views/Dashboard/Dashboard";
import Profile from "./views/Dashboard/Profile";
import EmailLists from "./views/Dashboard/EmailLists";
import EmailListsById from "./views/Dashboard/EmailListById";
import Templates from "./views/Dashboard/Templates";
import TemplateById from "./views/Dashboard/TemplateById";
import Mailers from "./views/Dashboard/Mailers";
import MailerDetails from "./views/Dashboard/MailerDetails";
import About from "./views/About";
import Freebies from "./views/Dashboard/Freebies";
import FreebieById from "./views/Dashboard/FreebieById";
import DownloadFeebie from "./views/Dashboard/DownloadFreebie";
import ContactUs from "./views/ContactUs";
import Documentation from "./views/Documentation";


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Auth Module */}
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/resend-verification" element={<ResendVerification />} />
          <Route path="/email/verify/success" element={<Success />} />
          <Route path="/auth/reset-password/:token/:email" element={<ResetPassword />} />
          {/* User Module */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/profile" element={<Profile />} />
          {/* Email lists */}
          <Route path="/email-lists" element={<EmailLists />} />
          <Route path="/email-lists/:id" element={<EmailListsById />} />
          {/* Templates */}
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:id" element={<TemplateById />} />
          {/* Mailers */}
          <Route path="/mailers" element={<Mailers />} />
          <Route path="/mailers/:id" element={<MailerDetails />} />
          {/* Freebies */}
          <Route path="/freebies" element={<Freebies />} />
          <Route path="/freebies/:id" element={<FreebieById />} />
          {/* Download freebie*/}
          <Route path="/freebies/:id/download" element={<DownloadFeebie />} />
          {/* Contact Us */}
          <Route path="/contact-us" element={<ContactUs />} />
          {/* Documentation */}
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
