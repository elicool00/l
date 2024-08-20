import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import Loader from "../../Components/Loader"
import "../../css/download.css"
import "../../css/loader.css"
import logo from "../../images/logo.png"
import FreebieServices from "../../services/Freebie"


function DownloadFeebie(){
    const [res, setRes] = useState({loading: true, data: null, error: null})
    const [downloadRes, setDownloadRes] = useState({loading: false, data: null, error: null})
    const [email, setEmail] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        FreebieServices.show(id)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }, [])

    const download = (e) => {
        e.preventDefault()
        setDownloadRes({loading: true, data: null, error: null})
        let data = {email: email}
        FreebieServices.download(id, data)
        .then(response => {
            setDownloadRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setDownloadRes({loading: false, data: null, error: error.response.data})
        })
    }

    let loader = null
    if(res.loading || downloadRes.loading){
        loader = <div className="loader_mid"><Loader/></div>
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
        navigate("/")
    }
    // Download response
    if(downloadRes.data){
        // set Email input to null
        document.getElementById("email").value = null
        setEmail(null)
        //
        if(downloadRes.data.status === 'success'){
            toast.success(downloadRes.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setDownloadRes({loading: false, data: null, error: null})
    }
    if(downloadRes.error){
        if(downloadRes.error.status === "fail"){
            toast.error(downloadRes.error.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        if(downloadRes.error.status === "fail-arr"){
            for (const [key, value] of Object.entries(downloadRes.error.message)) {
                toast.error(value[0], {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
            }
        }
    }

    let content = null
    if(res.data){
        if(res.data.status === 'success'){
            content = 
            <div className="d-background">
                <ToastContainer/>
                {loader}
                <div className="container">
                    <div className="row">
                        <div className="col-md-11 mt-60 mx-md-auto">
                            <div className="download-box bg-white pr-lg-5 pr-0">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <div className="form-wrap bg-white">
                                            <div className="my-3 p-2">
                                                <h2 className="c-black">Download {res.data.message.name}</h2>
                                            </div>
                                            <hr/>
                                            {(res.data.message.description) ? (
                                                <p>{res.data.message.description}</p>
                                            ) : (null)}
                                            <p>
                                                {(res.data.message.description) ? (
                                                    res.data.message.description
                                                ) : ("No description for this freebie")}
                                            </p>
                                            <span className="small text-muted mt-3">From {res.data.message.author_name}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 order-md-first">
                                        <div className="content">
                                            <form className="form p-4 mx-3" onSubmit={download}>
                                                <Link to="/"><img src={logo} className="img-fluid img-md mb-4 w-50"/></Link>                                        
                                                <div className="row mt-2">
                                                    <div className="col-12 input-group mb-3">
                                                        <input type="text" className="form-control" placeholder="Email" id="email" onChange={(e) => {setEmail(e.target.value)}} required/>
                                                        <div className="input-group-append">
                                                            <div className="input-group-text h-100">
                                                                <span className="fas fa-envelope"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button type="submit" id="submit" className="btn btn-outline-primary" disabled={downloadRes.loading}>
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }

    return content;
}

export default DownloadFeebie
