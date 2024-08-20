import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"
import "../../css/success.css"


function Success(){
    
    return (
        <div class="success-container">
            <div class="absolute-center">
                <div class="success-content">
                    <img src={logo} alt="LOGO" class="d-flex justify-center m-auto my-3"/>
                    <p class="success-message">Email verified successfully, you can log in!</p>
                    <div class="success-link-container">
                        <Link to="/auth/login" class="to-login"><i class="fa fa-sign-in mx-2"></i>Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
