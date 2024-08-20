import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MailerInfo from "../../Components/Dashboard/Mailers/MailerInfo";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/dashboard.css"
import AuthServices from "../../services/Auth";


function MailerDetails(){
    const [showSide, setShowSide] = useState(true)
    const [user, setUser] = useState({loading: true, data: null, error: null})
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        AuthServices.user()
        .then(response => {
            setUser({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setUser({loading: false, data: null, error: error.response.data})
            navigate("/")
        })
    }, [])
    
    let content
    if(user.data){
        content =
        <div id="wrapper" className={(showSide) ? ("wrapper-content") : ("wrapper-content toggled")}>
            <Sidebar active="My Mailers"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* mailer info */}
                            <MailerInfo id={id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return content
}

export default MailerDetails
