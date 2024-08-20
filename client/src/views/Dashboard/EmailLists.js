import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateList from "../../Components/Dashboard/EmailLists/CreateList";
import MyEmailLists from "../../Components/Dashboard/EmailLists/MyEmailLists";
import Footer from "../../Components/Dashboard/Footer";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/profile.css"
import AuthServices from "../../services/Auth";


function EmailLists() {
    const [showSide, setShowSide] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
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
    
    let content
    if(user.data){
        content = 
        <div id="wrapper" className={(showSide) ? ("wrapper-content") : ("wrapper-content toggled")}>
            <Sidebar active="Email lists"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper" className="profile-wrapper">                
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>My email lists</h1>
                        <button className="btn btn-outline-primary" onClick={() => {setShowCreate(true)}}><i className="fas fa-plus-circle mx-1"></i> Create list</button>
                    </div>
                    
                    <div className="main-body mt-3">
                        <div className="row">
                            <MyEmailLists/>
                            <CreateList show={showCreate} onHide={() => {setShowCreate(false)}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return content
}

export default EmailLists
