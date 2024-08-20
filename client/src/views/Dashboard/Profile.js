import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Dashboard/Footer";
import Navbar from "../../Components/Dashboard/Navbar";
import Avatar from "../../Components/Dashboard/Profile/AvatarComponent";
import UserInfo from "../../Components/Dashboard/Profile/InfoComponent";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/profile.css"
import AuthServices from "../../services/Auth";


function Profile(){
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
            <Sidebar active="My account"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper" className="profile-wrapper">                
                <div className="container">
                    <h1>Profile</h1>
                    <div className="main-body mt-2">
                        <div className="row">
                            <Avatar user={user.data}/>
                            <UserInfo user={user.data}/>
                        </div>
                    </div>
                </div>
            </div> 
            {/* <Footer/> */}
        </div>
    }
    return content
}

export default Profile
