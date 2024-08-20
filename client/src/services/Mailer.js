import http from "../http-common";

class MailerServices{
    index(){
        return http.get("/email-senders", {withCredentials: true})
    }

    show(id){
        return http.get(`/email-senders/${id}`, {withCredentials: true})
    }

    getInfo(){
        return http.get("/email-senders/create/info", {withCredentials: true})
    }

    create(data){
        return http.post("/email-senders", data, {withCredentials: true})
    }

    update(id, data){
        return http.patch(`/email-senders/${id}`, data, {withCredentials: true})
    }

    run(id){
        return http.post(`/email-senders/${id}/send`, null, {withCredentials: true})
    }

    destroy(id){
        return http.delete(`/email-senders/${id}`, {withCredentials: true})
    }
}

export default new MailerServices()
