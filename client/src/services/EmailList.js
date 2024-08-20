import http from "../http-common";

class EmailListServices{
    index(){
        return http.get("/email-lists", {withCredentials: true})
    }

    show(id){
        return http.get(`/email-lists/${id}`, {withCredentials: true})
    }

    create(data){
        return http.post("/email-lists", data, {withCredentials: true})
    }

    update(id, data){
        return http.patch(`/email-lists/${id}`, data, {withCredentials: true})
    }

    destroy(id, data){
        return http.delete(`/email-lists/${id}`, {withCredentials: true, data: data})
    }

    emails(id){
        return http.get(`/email-lists/${id}/emails`, {withCredentials: true})
    }

    appendEmails(id, data){
        return http.post(`/email-lists/${id}/emails`, data, {withCredentials: true})
    }

    deleteEmail(id){
        return http.delete(`/emails/${id}`, {withCredentials: true})
    }
}

export default new EmailListServices()