import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import FreebieServices from "../../../services/Freebie";
import Loader from "../../Loader";


function MyFreebies(){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const navigate = useNavigate()

    useEffect(() => {
        FreebieServices.index()
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
            navigate("/")
        })
    }, [])

    let loader = null
    if(res.loading){
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
    }
    let table
    let content
    if(res.data){
        if(res.data.status === 'success'){
            if(res.data.message.length === 0){
                table = <p className="my-2 text-muted">{loader}Empty...</p>
            }else{
                content = res.data.message.map(freebie => 
                    <tr>
                        <td>{freebie.name}</td>
                        <td><Link to={`/freebies/${freebie.id}/download`} target="_blank">{window.location.href + `/${freebie.id}/download`}</Link></td>
                        <td><Link to={`/email-lists/${freebie.list_id}`}>{freebie.list_name}</Link></td>
                        <td>{(freebie.tag) ? (freebie.tag) : ("No tag specified")}</td>
                        <td><Link to={`/freebies/${freebie.id}`} className="btn btn-outline-primary">Details</Link></td>
                    </tr>
                )
                table = 
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Email list</th>
                            <th>Tag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            }
        }
    }

    return table
}

export default MyFreebies
