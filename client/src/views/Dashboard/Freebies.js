import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateFreebie from "../../Components/Dashboard/Freebies/CreateFreebie";
import MyFreebies from "../../Components/Dashboard/Freebies/MyFreebies";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/dashboard.css"
import AuthServices from "../../services/Auth";


function Freebies(){
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
            <Sidebar active="Freebies"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper">                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1>Freebies</h1>
                                <button className="btn btn-outline-primary" onClick={() => {setShowCreate(true)}}><i className="fas fa-plus-circle mx-1"></i> Create freebie</button>
                            </div>
                            <p>
                                A Freebie is a marketing tool that allows customers to get to know your brand better.
                                <br/>
                                We can help you to create a page where people can download your freebie and append their emails
                                in a email list you have.
                            </p>
                            {/* my freebies */}
                            <div className="table-responsive-sm mt-4">
                                <MyFreebies/>
                            </div>
                            {/* create freebies */}
                            <CreateFreebie show={showCreate} onHide={() => {setShowCreate(false)}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return content
}

export default Freebies
