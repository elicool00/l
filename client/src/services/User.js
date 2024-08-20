import Http from "../http-common";


class UserServices{

    setAvatar(id, data){
        return Http.post(`/users/${id}/avatar`, data, {withCredentials: true})
    }

    deleteAvatar(id){
        return Http.delete(`/users/${id}/avatar`, {withCredentials: true})
    }

    updateInfo(id, data){
        return Http.patch(`/users/${id}`, data, {withCredentials: true})
    }

    updatePass(id, data){
        return Http.patch(`/users/${id}/password`, data, {withCredentials: true})
    }

    destroy(id, data){
        return Http.delete(`/users/${id}`, {withCredentials: true, data: data})
    }

    contact(data){
        return Http.post('/contact', data)
    }
}

export default new UserServices()
