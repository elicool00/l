import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import MailerServices from "../../../services/Mailer";
import { Link } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import RunSender from "./RunSender";


function MyMailers(){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [showRun, setShowRun] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        MailerServices.index()
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }, [])

    let loader = null
    if(res.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }

    const HandelShowRun = (id) => {
        setSelectedId(id)
        setShowRun(true)
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
    }
    let scheduledTable = null
    let onceTable = null
    let scheduledContent = null
    let onceContent = null
    if(res.data){
        if(res.data.status === 'success'){
            if(res.data.message.scheduled.length === 0){
                scheduledTable = <p className="my-2 text-muted">Empty...</p>
            }else{
                scheduledContent = res.data.message.scheduled.map((mailer, index) => 
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{mailer.name}</td>
                        <td className="text-capitalize">{mailer.frequency.replace("_", " ")}</td>
                        <td>{(mailer.status === "running") ? (
                            <span className="text-success text-capitalize">{mailer.status}</span>
                        ): (
                            <span className="text-danger text-capitalize">{mailer.status}</span> 
                        )}
                        </td>
                        <td>{new Date(mailer.created_at).toUTCString()}</td>
                        <td  className="d-flex justify-content-end">
                            <Link to={`/mailers/${mailer.id}`} className="btn btn-outline-primary">Details</Link>
                        </td>
                    </tr>
                )
                scheduledTable =
                <>
                    <ToastContainer/>
                    {loader}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Frequency</th>
                                <th>Status</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduledContent}
                        </tbody>
                    </table>
                </>
                
            }
            if(res.data.message.once.length === 0){
                onceTable = <p className="my-2 text-muted">Empty...</p>
            }
            else{
                onceContent = res.data.message.once.map((mailer, index) => 
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{mailer.name}</td>
                        <td className="text-capitalize">{mailer.frequency.replace("_", " ")}</td>
                        <td>{new Date(mailer.created_at).toUTCString()}</td>
                        <td>{(mailer.sent_at) ? (mailer.sent_at) : ("Not sent yet!")}</td>
                        <td className="d-flex justify-content-end">
                            <Link to={`/mailers/${mailer.id}`} className="btn btn-outline-primary mx-1">Details</Link>
                            <button className="btn btn-outline-info mx-1 mailer-tooltip" onClick={() => {HandelShowRun(mailer.id)}}>
                                {(mailer.sent_at) ? (
                                    <>
                                        <i className="fas fa-repeat"></i>
                                        <span className="mailer-tooltip-text px-2">Resend</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-play"></i>
                                        <span className="mailer-tooltip-text px-2">Send</span>
                                    </>
                                )}
                            </button>
                        </td>
                    </tr>
                )
                onceTable =
                <>
                    <ToastContainer/>
                    {loader}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Frequency</th>
                                <th>Created</th>
                                <th>Last sent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {onceContent}
                        </tbody>
                    </table>
                </>
            }   
        }
    }
    
    return (
        <>
            <div className="my-4">
                <h4>Scheduled mailers</h4>
                <div className="table-responsive-sm mt-2">
                    {scheduledTable}
                </div>                
            </div>
            <div className="mt-5">
                <h4>Once mailers</h4>
                <div className="table-responsive-sm mt-2">
                    {onceTable}
                </div>
                <RunSender show={showRun} onHide={() => {setShowRun(false)}} id={selectedId}/>             
            </div>
        </>
    )
}

export default MyMailers
