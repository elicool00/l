import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailListInfo from "../../Components/Dashboard/EmailLists/EmailListInfo";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/profile.css"
import AuthServices from "../../services/Auth";


function EmailListsById() {
    const [showSide, setShowSide] = useState(true)
    const [showEdit, setShowEdit] = useState(false)
    const [user, setUser] = useState({loading: true, data: null, error: null})
    const navigate = useNavigate()
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
    
    ////
    const { id } = useParams()

    let content
    if(user.data){
        content = 
        <div id="wrapper" className={(showSide) ? ("wrapper-content") : ("wrapper-content toggled")}>
            <Sidebar active="Email lists"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper" className="profile-wrapper">                
                <div className="container-fluid">
                    <EmailListInfo id={id}/>
                </div>
            </div>
        </div>
    }
    return content
}

export default EmailListsById
