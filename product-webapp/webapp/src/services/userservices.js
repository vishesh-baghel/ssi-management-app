import axios from 'axios';

let url = "http://localhost:3001/SSI";

export const getSsi = () =>{
    return axios.get(url);
}