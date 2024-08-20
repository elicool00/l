import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Services from "../Components/Home/Services";
import Slider from "../Components/Home/Slider";
import AuthServices from "../services/Auth";


function Home(){
    const [user, setUser] = useState({loading: true, data: null, error: null})
    useEffect(() => {
        AuthServices.user()
        .then(response => {
            setUser({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setUser({loading: false, data: null, error: error.response.data})
        })
    }, [])
    return<div className="sub_page">
        <Header user={user}/>
        <Slider user={user}/>
        <Services/>
        <Footer/>
    </div> 
}

export default Home
