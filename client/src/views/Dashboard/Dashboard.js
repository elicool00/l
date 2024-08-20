import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Dashboard/Footer";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/dashboard.css"
import AuthServices from "../../services/Auth";


function Dashboard(){
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
            <Sidebar active="Dashboard"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper">                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Dashboard</h1>
                            <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, 
                            and will appear non-collapsed on larger screens.</p>
                            <p>Make sure to keep your content here</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    }
    return content
}

export default Dashboard
