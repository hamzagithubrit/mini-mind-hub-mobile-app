import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.0.109:4000/api",

});

export default api;

//http://10.135.52.87:4000/api


//http://10.135.52.87:7000/mini