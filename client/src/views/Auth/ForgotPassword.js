import React, { useState } from "react";
import "../../css/login.css"
import loginSlide from "../../images/login-slide.jpg"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/Loader";
import AuthServices from "../../services/Auth";
import { t } from "../../Translate/Translate";


function ForgotPassword(){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [email, setEmail] = useState(null)
    let loader = null

    const setEverythingToNull = () => {
        setEmail(null)
        document.getElementById("email").value = ""
    }

    const sendResetLink = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data = {email: email}
        AuthServices.sendResetPassLink(data)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    if(res.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }
    if(res.data){
        setEverythingToNull()
        if(res.data.status === 'success'){
            toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setRes({loading: false, data: null, error: null})
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
        <div className="login-container">
            <ToastContainer/>
            {loader}
            <div id="main-wrapper" className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="card border-0">
                            <div className="card-body p-0">
                                <div className="row no-gutters">
                                    <div className="col-lg-6">
                                        <div className="p-4">
                                            <div className="mb-5">
                                                <h3 className="h4 font-weight-bold text-theme">{t('reset_pass')}</h3>
                                            </div>
                                            <form onSubmit={sendResetLink}>
                                                <div className="form-group mb-4">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" className="form-control my-1 py-1 px-3" id="email" onChange={(e) => {setEmail(e.target.value)}} />
                                                </div>
                                                <button type="submit" className="btn btn-outline-primary col-12 mb-4" disabled={res.loading}>{t('send_reset')}</button>
                                                <fieldset className="form-input my-1">
                                                    <Link to="/auth/login">{t('go_login')}</Link>
                                                </fieldset> 
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-none d-lg-inline-block">
                                        <div className="account-block rounded-right">
                                            <div className="overlay rounded-right"></div>
                                            <div className="account-testimonial">
                                                <h4 className="text-white mb-4 text-left"><Link to="/" className="link-light">Laramailer</Link></h4>
                                                <p className="lead text-white text-left">{t('reset_text')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
