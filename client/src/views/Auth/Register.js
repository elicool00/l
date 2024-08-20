import React, { useEffect, useState } from "react";
import "../../css/login.css"
import { Link, useNavigate } from "react-router-dom"
import AuthServices from "../../services/Auth"
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/Loader"
import { t } from "../../Translate/Translate";


function Register(){
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
    const navigate = useNavigate()
    if(user.data){
        navigate("/")
    }    

    const [username, setUsername] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passConfirm, setPassConfirm] = useState(null)
    const [res, setRes] = useState({loading: false, data: null, error: null})
    let loader = null
    const registration = (e) => {
        e.preventDefault()
        let data = {username: username, full_name: fullName, email: email, password: password, password_confirmation: passConfirm}
        setRes({loading: true, data: null, error: null})
        AuthServices.register(data)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    const setEverythingToNull = () => {
        setUsername(null)
        document.getElementById("username").value = ""
        setFullName(null)
        document.getElementById("full_name").value = ""
        setEmail(null)
        document.getElementById("email").value = ""
        setPassword(null)
        document.getElementById("password").value = ""
        setPassConfirm(null)
        document.getElementById("pass_confirm").value = ""
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
                                                <h3 className="h4 font-weight-bold text-theme">{t('registration')}</h3>
                                            </div>
                                            <form onSubmit={registration}>
                                                <div className="form-group">
                                                    <label htmlFor="username">{t('username')}</label>
                                                    <input type="text" className="form-control my-1 py-2 px-3" id="username" onChange={(e) => {setUsername(e.target.value)}} value={username}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="full_name">{t('full_name')}</label>
                                                    <input type="text" className="form-control my-1 py-2 px-3" id="full_name" onChange={(e) => {setFullName(e.target.value)}} value={fullName}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email address</label>
                                                    <input type="email" className="form-control my-1 py-2 px-3" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">{t('password')}</label>
                                                    <input type="password" className="form-control my-1 py-2 px-3" id="password" onChange={(e) => {setPassword(e.target.value)}} />
                                                </div>
                                                <div className="form-group mb-4">
                                                    <label htmlFor="pass_confirm">{t('password_confirmation')}</label>
                                                    <input type="password" className="form-control my-1 py-2 px-3" id="pass_confirm" onChange={(e) => {setPassConfirm(e.target.value)}} />
                                                </div>
                                                <button type="submit" className="btn btn-outline-primary col-12 mb-4" disabled={res.loading}>{t('sign_up')}</button>
                                                <fieldset className="form-input my-1">
                                                    <Link to="/auth/login">{t('already_have_account')}</Link>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-none d-lg-inline-block">
                                        <div className="account-block rounded-right">
                                            <div className="overlay rounded-right"></div>
                                            <div className="account-testimonial">
                                                <h4 className="text-white mb-4 text-left"><Link to="/" className="link-light">Laramailer</Link></h4>
                                                <p className="lead text-white text-left">{t('register_text')}</p>
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

export default Register
