import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/Loader";
import AuthServices from "../../services/Auth";
import { t } from "../../Translate/Translate";


function ResetPassword(){
    const [password, setPasssword] = useState(null)
    const [passConfirm, setPassConfirm] = useState(null)
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const { token, email } = useParams()
    let loader = null
    const navigate = useNavigate()

    const reset = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data = {email: email, token: token, password: password, password_confirmation: passConfirm}
        AuthServices.resetPassword(data)
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
        if(res.data.status === 'success'){
            toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setRes({loading: false, data: null, error: null})
        navigate('/auth/login', { replace: true })
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
                                            <form onSubmit={reset}>
                                                <div className="form-group">
                                                    <label htmlFor="email">{t('new_pass')}</label>
                                                    <input type="password" className="form-control my-1" id="email" onChange={(e) => {setPasssword(e.target.value)}} />
                                                </div>
                                                <div className="form-group mb-4">
                                                    <label htmlFor="email">{t('confirm_new_pass')}</label>
                                                    <input type="password" className="form-control my-1" id="email" onChange={(e) => {setPassConfirm(e.target.value)}} />
                                                </div>
                                                <button type="submit" className="btn btn-outline-primary col-12 mb-4" disabled={res.loading}>{t('reset_pass')}</button>
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

export default ResetPassword
