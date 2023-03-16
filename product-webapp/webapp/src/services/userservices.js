import axios from 'axios';

let url = "http://localhost:3001/SSI";
let userUrl = "http://localhost:3001/users"

export const getSsi = () => {
    return axios.get(url);
}

export const addSsi=(data)=>{
    return axios.post(url,data)
}

export const editSsi=(id,data)=>{
    return axios.put(url+"/"+id,data)
}

export const deleteSSI = (ssiId) => {
    return axios.delete(url + "/" + ssiId);
}

export const getSSIbyID = (ssiId) =>{
    return axios.get(url+"/"+ssiId);
}

export const getSSIbySsiID = (ssiId) =>{
    return axios.get(url,{params:{ssiRefId:ssiId}});
}

export const putSSIbyID = (ssiId, obj) =>{
    return axios.put(url+"/"+ssiId, obj)
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