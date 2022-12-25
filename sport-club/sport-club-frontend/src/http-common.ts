import axios from "axios";

const token = localStorage.getItem("token")
  
const instance= axios.create(
  
  {
  baseURL: "http://localhost:8081/",
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.response.use((response) => {
      console.log(`response ${response}`);
      return response;
    }, (error) => {
      console.log(`error ${error}`);
      return Promise.reject(error);
});

instance.interceptors.request.use((config) => {
     if (token && config.headers) {
         config.headers.Authorization = `Bearer ${token}`
     }         
   
     return config
})

export default instance;
