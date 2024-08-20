import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AuthServices from "../services/Auth";
import "../css/documentation.css"
import { Link } from "react-router-dom";
import emailListImg from "../images/emailList.png"
import mailerImg from "../images/mailers.png"
import freebieImg from "../images/freebies.png"
import templateImg from "../images/templates.png"
import { t } from "../Translate/Translate";


function Documentation(){
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

    return (
        <div className="sub_page">
            <Header user={user}/>
            <section className="mt-5">
                <div className="container">
                    <div className="section-heading wow fadeIn">
                        <h2></h2>
                        <div className="heading-separator"></div>
                    </div>
                    
                    <div className="row">
                        <div className="history-wrapper">
                            <div className="title-wrap text-center one-of-two">
                                <h2 className="h1 text-secondary mb-0 text-uppercase"></h2>
                                <p className="fs-3 font-weight-500">Documentation</p>
                            </div>
                            <div className="timeline-box one-of-two">
                                <img className="mb-1-6 rounded img-fluid border" src={emailListImg} alt="..."/>
                                <div className="content">
                                    <h3 className="h4 mb-2 mb-md-3 text-left">{t('email_list')}</h3>
                                    <p className="mb-0 text-left">
                                        {t('doc_email_list')}
                                    </p>
                                </div>
                                <div className="year">1</div>
                            </div>
                            <div className="timeline-box one-of-two">
                                <img className="mb-1-6 rounded img-fluid border" src={templateImg} alt="..."/>
                                <div className="content">
                                    <h3 className="h4 mb-2 mb-md-3 text-left">{t('template')}</h3>
                                    <p className="mb-0 text-left">
                                        {t('doc_email_temp1')}
                                        <br/><br/>
                                        {t('doc_email_temp2')}
                                        <br/><br/>
                                        {t('doc_email_temp3')}
                                    </p>
                                </div>
                                <div className="year">2</div>
                            </div>
                            <div className="timeline-box one-of-two">
                                <img className="mb-1-6 rounded img-fluid border" src={mailerImg} alt="..."/>
                                <div className="content">
                                    <h3 className="h4 mb-2 mb-md-3 text-left">{t('mailer')}</h3>
                                    <p className="mb-0 text-left">
                                        {t('doc_mailer1')}
                                        <br/>
                                        {t('doc_mailer2')}
                                        <br/><br/>
                                        {t('doc_mailer3')}
                                        <br/>
                                        {t('doc_mailer4')}
                                    </p>
                                </div>
                                <div className="year">3</div>
                            </div>
                            <div className="timeline-box one-of-two">
                                <img className="mb-1-6 rounded img-fluid border" src={freebieImg} alt="..."/>
                                <div className="content">
                                    <h3 className="h4 mb-2 mb-md-3 text-left">{t('freebies')}</h3>
                                    <p className="mb-0 text-left">
                                        {t('doc_freebie1')} 
                                        <br/><br/>
                                        {t('doc_freebie2')}
                                        <br/><br/>
                                        {t('doc_freebie3')}  <Link to="/contact-us">{t('contact')}</Link>
                                    </p>
                                </div>
                                <div className="year">4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Documentation
