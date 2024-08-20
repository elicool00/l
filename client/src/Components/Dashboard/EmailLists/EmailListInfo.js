import React, { useEffect, useState } from "react";
import EmailListServices from "../../../services/EmailList";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UpdateList from "./UpdateList";
import EmailListContent from "./EmailListContent";
import AppendEmail from "./AppendEmails";


function EmailListInfo(props){
    const [list, setList] = useState({loading: true, data: null, error: null})
    const [showEdit, setShowEdit] = useState(false)
    const [showAppend, setShowAppend] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        EmailListServices.show(props.id)
        .then(response => {
            setList({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setList({loading: false, data: null, error: error.response.data})
        })
    }, [])

    let loader = null
    if(list.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }

    if(list.error){
        if(list.error.status === "fail"){
            toast.error(list.error.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        if(list.error.status === "fail-arr"){
            for (const [key, value] of Object.entries(list.error.message)) {
                toast.error(value[0], {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
            }
        }
        setList({loading: false, data: null, error: null})
        navigate("/dashboard")
    }

    let content = null
    if(list.data){
        if(list.data.status === 'success'){
            content =
            <>
                <ToastContainer/>
                {loader}
                <div className="d-flex justify-content-between align-items-center">
                    <h1>{list.data.message.name}</h1>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-outline-primary mx-2" onClick={() => {setShowEdit(true)}}><i className="fas fa-pen mx-1"></i> Edit list info</button>
                        <button className="btn btn-primary" onClick={() => {setShowAppend(true)}}><i className="fas fa-plus-circle mx-1"></i> Append to list</button>
                    </div>
                </div>
                <p>{(list.data.message.description) ? (list.data.message.description) : ("No description")}</p>
                <UpdateList show={showEdit} onHide={() => {setShowEdit(false)}} list={list.data.message}/>
                <AppendEmail show={showAppend} onHide={() => {setShowAppend(false)}} list={list.data.message}/>
                <EmailListContent list={list.data.message}/>
            </>
        }
    }

    return content
}

export default EmailListInfo