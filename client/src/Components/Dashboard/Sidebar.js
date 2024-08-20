import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo-w.png"


function Sidebar(props){
    return (
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand mb-4">
                    <Link to="/"><img src={logo} className="sidebar-brand-img"/></Link>
                </li>
                {/* <li className={(props.active === "Dashboard") ? ("active") : ("")}>
                    <Link to="/dashboard"><i className="fa fa-dashboard"></i> Dashboard</Link>
                </li> */}
                <li className={(props.active === "My Mailers") ? ("active") : ("")}>
                    <Link to="/mailers"><i className="fa fa-envelope"></i> My Mailers</Link>
                </li>
                <li className={(props.active === "Email lists") ? ("active") : ("")}>
                    <Link to="/email-lists"><i className="fas fa-clipboard-list"></i> Email lists</Link>
                </li>
                <li className={(props.active === "Templates") ? ("active") : ("")}>
                    <Link to="/templates"><i className="fas fa-th-large"></i> Templates</Link>
                </li>
                <li className={(props.active === "Freebies") ? ("active") : ("")}>
                    <Link to="/freebies"><i className="fas fa-layer-group"></i> Freebies</Link>
                </li>
                <li className={(props.active === "My account") ? ("active") : ("")}>
                    <Link to="/profile"><i className="fas fa-address-card"></i> My account</Link>
                </li>
                <li className="sidebar-bottom">
                    <p>
                        &copy; <span id="displayYear">{new Date().getFullYear()}</span> All Rights Reserved By
                        <a className="text-info" href="https://www.linkedin.com/in/ayoub-el-haddadi-590b99219/"> Ayoub El-Haddadi</a>   
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
