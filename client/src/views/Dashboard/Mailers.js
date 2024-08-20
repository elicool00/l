import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateMailer from "../../Components/Dashboard/Mailers/CreateMailer";
import MyMailers from "../../Components/Dashboard/Mailers/MyMailers";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/dashboard.css"
import AuthServices from "../../services/Auth";


function Mailers(){
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
            <Sidebar active="My Mailers"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper">                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            
                            <div className="d-flex justify-content-between align-items-center">
                                <h1>Mailers</h1>
                                <button className="btn btn-outline-primary" onClick={() => {setShowCreate(true)}}><i className="fas fa-plus-circle mx-1"></i>Create mailer</button>
                            </div>
                            <p>Make sure you have created an <Link to="/email-lists">email list</Link> and <Link to="/templates">template</Link></p>
                            <CreateMailer show={showCreate} onHide={() => {setShowCreate(false)}} user={user.data}/>

                            <div className="mt-2">
                                <MyMailers/>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return content
}

export default Mailers
