import React, { useEffect, useState } from "react";
import heroBg from "../images/hero-bg.png"
import logo from "../images/logo-w.png"
import { Link } from "react-router-dom";
import AuthServices from "../services/Auth";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";
import {t, getLang, setLang } from "../Translate/Translate";


function Header(props){
  const [res, setRes] = useState({loading: false, data: null, error: null})
  const [collapse, setCollapse] = useState(false)

  const logout = () => {
    setRes({loading: true, data: null, error: null})
    AuthServices.logout()
    .then(response => {
        setRes({loading: false, data: response.data, error: null})
    })
    .catch(error => {
        setRes({loading: false, data: null, error: error.response.data})
    })
  }

  let loader = null
  if(res.loading){
    loader = loader = <div className="loader_mid"><Loader/></div>
  }
  if(res.data){
    if(res.data.status === 'success'){
        toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
    }
    setRes({loading: false, data: null, error: null})
    window.location.reload()
  }

  const HandelLangChange = (e) => {
    setLang(e.target.value)
    window.location.reload()
  }

  return(
    <div className="hero_area">
        <ToastContainer/>
        {loader}
        <div className="hero_bg_box">
          <div className="bg_img_box">
            <img src={heroBg} alt=""/>
          </div>
        </div>
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <Link className="navbar-brand" to="/">
                <span>
                    <img className="mx-2" style={{height: "45px"}} src={logo}/>
                </span>
              </Link>
    
              <button className={(collapse) ? ("navbar-toggler collapsed") : ("navbar-toggler")} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
              aria-expanded="false" aria-label="Toggle navigation" onClick={() => (setCollapse(!collapse))}>
                <span className=""> </span>
              </button>
    
              <div className={(collapse) ? ("collapse navbar-collapse show") : ("collapse navbar-collapse")} id="navbarSupportedContent">
                <ul className="navbar-nav  align-items-center">
                  <li className="nav-item ">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link">{t('about')}</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/documentation" className="nav-link">Documentation</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact-us" className="nav-link">{t('contact')}</Link>
                  </li>
                  <li className="nav-item">
                    {(props.user.data) ? (
                      <Link to="/mailers" className="nav-link"><i className="fa fa-dashboard"></i> {t('dashboard')}</Link>
                    ) : (
                      <Link to="/auth/login" className="nav-link"><i className="fa fa-user" aria-hidden="true"></i> {t('login')}</Link>
                    )}
                  </li>
                  {(props.user.data) ? (
                    <li className="nav-item mx-2">
                      <button className="btn btn-outline-light" onClick={logout}><i className="fa fa-sign-out mr-1" aria-hidden="true"></i> {t('logout')}</button>
                    </li>
                  ) : (null)}
                  <li className="nav-item">
                    <select className="form-select-sm lang" defaultValue={getLang()} onChange={HandelLangChange}>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
    </div>
  )
}

export default Header
