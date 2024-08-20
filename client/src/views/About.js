import React, { useEffect, useState } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import AuthServices from "../services/Auth"
import Img from "../images/slider-img.png"
import { Link } from "react-router-dom"
import { t } from "../Translate/Translate"


function About(){
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

    return(
        <div className="sub_page">
            <Header user={user}/>
            <section class="about_section layout_padding">
                <div class="container">
                <div class="heading_container heading_center">
                    <h2>
                    {t('about_title')[0]} <span>{t('about_title')[1]}</span>
                    </h2>
                </div>
                <div class="row">
                    <div class="col-md-6 ">
                    <div class="img-box">
                        <img src={Img} alt="Image"/>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="detail-box">
                        <h3>
                        {t('about_t')}
                        </h3>
                        <p>
                            {t('about_text1')}
                        </p>
                        <p>
                            {t('about_text2')} <Link to="/documentation">Documentation</Link> page 
                            {t('about_text3')} <Link to="/contact-us">Contact us</Link> page.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <Footer/>
        </div>
    ) 
}

export default About
