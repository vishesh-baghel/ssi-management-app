import axios from 'axios';

let url = "http://localhost:3001/SSI";
let userUrl = "http://localhost:3001/users"

export const getSsi = () => {
    return axios.get(url);
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