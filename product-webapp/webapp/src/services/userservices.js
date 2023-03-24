import axios from 'axios';

let url = "http://localhost:8081/ssi";
let userUrl = "http://localhost:3001/users"

export const addSsi=(data)=>{
    return axios.post(url+"/add",data)
}

export const deleteSSI = (id) => {
    return axios.delete(url + "/" + id);
}

export const editSsi=(id,data)=>{
    return axios.patch(url+"/"+id,data)
}

export const getSsi = (data) => {
    return axios.post(url,data);
}

export const addUser = (data) =>{
    return axios.post(userUrl,data) 
}
export const getUsers = () => {
    return axios(userUrl)
}

export const removeUser = (id)=>{
    return axios.delete(userUrl+"/"+id);
}

export const updateUserAdminStatus=(id,isAdmin)=>{
    return axios.patch(`${userUrl}/${id}`,{userRole:!isAdmin})
}
export const getUserbyId=(id)=>{
    // return axios.get(`${userUrl}/${id}`)
    return axios.get(userUrl+"/"+id)
}