import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Loader";
import EmailListServices from "../../../services/EmailList";
import { Link } from "react-router-dom";
import DeleteList from "./DeleteList";


function MyEmailLists(){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [showEdit, setShowEdit] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        EmailListServices.index()
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }, [])

    let loader = null
    if(res.loading){
        loader = loader = <div className="loader_mid"><Loader/></div>
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
    const DeleteClickHandler = (id) => {
        setSelectedId(id)
        setShowEdit(true)
    }

    let table = null
    let content = null
    if(res.data){
        if(res.data.status === 'success'){
            if(res.data.message.length === 0){
                table = <p className="my-2 text-muted">Empty...</p>
            }else{
                content = res.data.message.map(list => 
                    <tr key={list.id} itemScope="row">
                        <td><Link to={`/email-lists/${list.id}`}>{list.name}</Link></td>
                        <td className="col-5" id="description_row">{(list.description) ? (
                            (list.description.length >= 41) ? (list.description.substring(0, 41) + "...") : (list.description)
                        ) : ("No description")}</td>
                        <td>{new Date(list.created_at).toUTCString()}</td>
                        <td>
                            <Link to={`/email-lists/${list.id}`} className="btn btn-outline-warning btn-sm mx-2"><i className="fas fa-pen"></i></Link>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => {DeleteClickHandler(list.id)}}><i className="fas fa-trash"></i></button>
                        </td>
                    </tr>
                )
                table = 
                <div className="table-responsive-lg table-responsive-md table-responsive-sm">
                    <ToastContainer/>
                    {loader}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Created at</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                            {(content && selectedId) ? (
                                <DeleteList show={showEdit} onHide={() => {setShowEdit(false)}} id={selectedId}/>
                            ) : (null)}
                        </tbody>
                    </table>
                </div>
            }            
        }
    }
    return table
}

export default MyEmailLists
