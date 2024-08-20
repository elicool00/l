import http from "../http-common";

class TemplateServices{
    getDefault(){
        return http.get("/templates/default", {withCredentials: true})
    }

    index(){
        return http.get("/templates", {withCredentials: true})
    }

    show(id){
        return http.get(`/templates/${id}`, {withCredentials: true})
    }

    update(id, data){
        return http.post(`/templates/${id}`, data, {withCredentials: true})
    }

    create(data){
        return http.post("/templates", data, {withCredentials: true})
    }

    destroy(id, data){
        return http.delete(`/templates/${id}`, {withCredentials: true, data: data})
    }
}

export default new TemplateServices()
