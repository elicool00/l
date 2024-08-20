import http from "../http-common";


class FreebieServices{
    index(){
        return http.get('/freebies', {withCredentials: true})
    }

    store(data){
        return http.post('/freebies', data, {withCredentials: true})
    }

    show(id){
        return http.get(`/freebies/${id}`, {withCredentials: true})
    }

    update(id, data){
        return http.post(`/freebies/${id}`, data, {withCredentials: true})
    }

    download(id, data){
        return http.post(`/freebies/${id}/download`, data, {withCredentials: true})
    }

    destroy(id, data){
        return http.delete(`/freebies/${id}`, {withCredentials: true, data: data})
    }
}

export default new FreebieServices()
