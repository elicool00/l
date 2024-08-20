import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthServices from "../../services/Auth";
import Loader from "../Loader";
import { toast, ToastContainer } from "react-toastify";


function Navbar(props){
    const [showNav, setShowNav] = useState(false);
    const [res, setRes] = useState({loading: false, data: null, error: null})
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

    return (
        <div className="d-flex justify-content-between align-items-center p-3">
            <div className="navbar-header">
                <ToastContainer/>
                {loader}
                <button className="navbar-toggler btn-md" type="button" onClick={() => {props.setShowSide(!props.showSide)}}>
                    <i className="fa fa-bars"></i>
                </button>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dashboar justify-content-end">            
                <button className="navbar-toggler btn-md" type="button" data-toggle="collapse" data-target="#dashboard_navbar" onClick={() => {setShowNav(!showNav)}} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-ellipsis-v"></i>
                </button>
        
                <div className={(showNav) ? ("collapse navbar-collapse navbar-dashboard nav-border-bottom show") : ("collapse navbar-collapse navbar-dashboard nav-border-bottom")}  id="dashboard_navbar">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link dashboard-nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/documentation" className="nav-link dashboard-nav-link" href="#">Documentation</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link dashboard-nav-link logout-dash-btn" onClick={logout}>logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
