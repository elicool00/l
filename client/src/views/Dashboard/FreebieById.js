import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FreebieDetails from "../../Components/Dashboard/Freebies/FreebieDetails";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/dashboard.css"
import AuthServices from "../../services/Auth";


function FreebieById(){
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
            <Sidebar active="Freebies"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <FreebieDetails id={id}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    return content
}

export default FreebieById
