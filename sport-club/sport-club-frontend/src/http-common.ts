import axios from "axios";

const token = localStorage.getItem('token')
  
const instance= axios.create(
  
  {
  baseURL: "http://localhost:8081/",
  headers: {
    "Content-type": "application/json",
   // "Authorization": `Bearer ${token}`
  },
});

instance.interceptors.request.use((config) => {
     if (token && config.headers) {
         config.headers.Authorization = `Bearer ${token}`
     }         
   
     return config
})

export default instance;
