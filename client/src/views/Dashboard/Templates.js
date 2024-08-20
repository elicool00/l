import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import DefaultTemplates from "../../Components/Dashboard/Templates/DefaultTemplates";
import MyTemplates from "../../Components/Dashboard/Templates/MyTemplates";
import "../../css/dashboard.css"
import AuthServices from "../../services/Auth";


function Templates(){
    const [showSide, setShowSide] = useState(true)
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
            <Sidebar active="Templates"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper">                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Templates</h1>
                            <DefaultTemplates/>

                            <h5 className="mt-5">My templates</h5>
                            <MyTemplates/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return content
}

export default Templates
