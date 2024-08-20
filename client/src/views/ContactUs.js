import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AuthServices from "../services/Auth";
import UserServices from "../services/User";
import "../css/contact.css"
import Loader from "../Components/Loader";
import { toast, ToastContainer } from "react-toastify";
import { t } from "../Translate/Translate";


function ContactUs(){
    const [user, setUser] = useState({loading: true, data: null, error: null})
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [subject, setSubject] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        AuthServices.user()
        .then(response => {
            setUser({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setUser({loading: false, data: null, error: error.response.data})
        })
    }, [])

    const send = (e) => {
        e.preventDefault()
        let data = {full_name: fullName, email: email, subject: subject, message: message}
        setRes({loading: true, data: null, error: null})
        UserServices.contact(data)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    const setInputsToNull = () => {
        document.getElementById("email").value = ""
        setEmail(null)
        document.getElementById("name").value = ""
        setFullName(null)
        document.getElementById("subject").value = ""
        setSubject(null)
        document.getElementById("message").value = ""
        setMessage(null)
    }

    let loader = null
    if(res.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }
    if(res.data){
        if(res.data.status === 'success'){
            toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setRes({loading: false, data: null, error: null})
        setInputsToNull()
    }

    if(res.error){
        if(res.error.status === "fail"){
            toast.error(res.error.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        if(res.error.status === "fail-arr"){
            for (const [key, value] of Object.entries(res.error.message)) {
                toast.error(value[0], {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
            }
        }
        setRes({loading: false, data: null, error: null})
    }

    return (
        <div className="sub_page">
            <ToastContainer/>
            {loader}
            <Header user={user}/>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="wrapper box-shadow">
                                <div className="row">
                                    <div className="col-lg-8 col-md-12 order-md-last row align-items-stretch contact-wrap mx-0">
                                        <div className="col-12 p-md-5 p-4">
                                            <h3 className="mb-4">{t('contact_title1')}</h3>
                                            <form id="contactForm" className="contactForm" onSubmit={send}>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="">
                                                            <label className="label" htmlFor="name">{t('full_name')}</label>
                                                            <input type="text" className="form-control input-control" id="name" placeholder={t('name')} onChange={(e) => {setFullName(e.target.value)}} required/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="">
                                                            <label className="label" htmlFor="email">Email Address</label>
                                                            <input type="email" className="form-control input-control" id="email" placeholder="Email"  onChange={(e) => {setEmail(e.target.value)}} required/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="my-3">
                                                            <label className="label" htmlFor="subject">{t('subject')}</label>
                                                            <input type="text" className="form-control input-control" id="subject" placeholder={t('subject')}  onChange={(e) => {setSubject(e.target.value)}} required/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="my-3">
                                                            <label className="label" htmlFor="#">Message</label>
                                                            <textarea className="form-control area-control" id="message" cols="30" rows="4"
                                                            placeholder="Message"  onChange={(e) => {setMessage(e.target.value)}} required></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group d-flex justify-content-end">
                                                            <button type="submit" className="btn btn-outline-primary" disabled={res.loading}>{t('send_m')}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12 row align-items-stretch mx-0 p-0">
                                        <div className="info-wrap col-12 p-md-5 p-4">
                                            <h3>{t('contact_title2')}</h3>
                                            <p className="mb-4">{t('contact_title3')}</p>
                                            
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center mx-2">
                                                    <span className="fa fa-phone"></span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p><a href="tel://212639109957">+212-639109957</a></p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center mx-2">
                                                    <span className="fas fa-paper-plane"></span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p><a href="https://t.me/Elh98ayoub" target="_blank">+380-955072544</a></p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center mx-2">
                                                    <span className="fas fa-envelope"></span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p><a href="mailto:support@laramailer.com">support@laramailer.com</a></p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex justify-content-between align-items-center">
                                                <a className="icon d-flex align-items-center justify-content-center mx-2" target="_blank" href="https://www.linkedin.com/in/ayoub-el-haddadi-590b99219/">
                                                    <span className="fa fa-linkedin"></span>
                                                </a>
                                                <a className="icon d-flex align-items-center justify-content-center mx-2" target="_blank" href="https://www.facebook.com/elhaddadi.a">
                                                    <span className="fa fa-facebook"></span>
                                                </a>
                                                <a className="icon d-flex align-items-center justify-content-center mx-2" target="_blank" href="https://www.instagram.com/elh_ayoub_/">
                                                    <span className="fa fa-instagram"></span>
                                                </a>
                                                <a className="icon d-flex align-items-center justify-content-center mx-2" target="_blank" href="https://github.com/Elh-Ayoub">
                                                    <span className="fa fa-github"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default ContactUs
