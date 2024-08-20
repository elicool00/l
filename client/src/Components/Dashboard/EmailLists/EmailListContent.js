import React, { useEffect, useState } from "react";
import EmailListServices from "../../../services/EmailList";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteEmail from "./DeleteEmail";


function EmailListContent(props){
    const [emails, setEmail] = useState({loading: true, data: null, error: null})
    const [showDelete, setShowDelete] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        EmailListServices.emails(props.list.id)
        .then(response => {
            setEmail({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setEmail({loading: false, data: null, error: error.response.data})
        })
    }, [])

    const HandleShowDelete = (id) => {
        setSelectedId(id)
        setShowDelete(true)
    }

    let loader = null
    if(emails.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }
    if(emails.error){
        if(emails.error.status === "fail"){
            toast.error(emails.error.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        if(emails.error.status === "fail-arr"){
            for (const [key, value] of Object.entries(emails.error.message)) {
                toast.error(value[0], {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
            }
        }
        setEmail({loading: false, data: null, error: null})
    }

    let content = null
    let i = 1
    if(emails.data){
        if(emails.data.status === 'success'){
            content = emails.data.message.map(email =>
                <tr key={email.id}>
                    <td>{i++}</td>
                    <td>{email.email}</td>
                    <td>{(email.tag) ? (email.tag) : ("No tag specified")}</td>
                    <td className="text-center">
                        <button className="btn btn-danger btn-sm" onClick={() => {HandleShowDelete(email.id)}}><i className="fas fa-trash"></i></button>
                    </td>
                </tr>
            )
        }
    }

    return (
        <div className="card">
            <ToastContainer/>
            {loader}
            <div className="card-body table-responsive-sm">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Tag</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
            <DeleteEmail show={showDelete} onHide={() => {setShowDelete(false)}} id={selectedId}/>
        </div>
    )
}

export default EmailListContent
