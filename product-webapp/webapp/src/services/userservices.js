import axios from 'axios';

let url = "http://localhost:8080/ssi";
let userUrl = "http://localhost:8086/user"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  }

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

export const editUser=(id,data)=>{
    return axios.patch(userUrl+"/"+id,data)
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
    return axios.get(userUrl+"/"+id)
}