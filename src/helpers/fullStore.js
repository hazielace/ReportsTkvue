import axios from "axios";
import router from "@/router";

function reloadData() {
    axios.defaults.headers.common = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    axios.interceptors.request.use(function(config) {
        return config;
    }, function(error) {  
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function(response) {
        let arrayDeCadenas = response.request.responseURL.split("/"); 
        if (arrayDeCadenas.includes("unauthorized") && localStorage.getItem("auth_token")) {
            console.log('Unauthorized access, redirecting to login...');
            router.push('/login');
        } 
        return response;
    }, function(error) {
        var status = error.response.status;
        if (status === 405 || status === 500) {
            console.log("Error in request!");
        }
        if (status === 403 || status === 404 || status === 302 || status === 303) {
            let arrayDeCadenas = error.response.request.responseURL.split("/");
            if (arrayDeCadenas.includes("unauthorized") && localStorage.getItem("auth_token")) {  
                router.push('/login'); 
            }
        }
        return Promise.reject(error);
    });
}

export function tryToLogInStore(email, password) {
    reloadData();
    let ruta = import.meta.env.VITE_APP_URL_API;
    return axios.post(`${ruta}/login`, {
        email: email,
        password: password,
    });
}

export function logout() {
    reloadData();
    let ruta = import.meta.env.VITE_APP_URL_API;
    return axios.get(`${ruta}/logout`).then(() => {
        localStorage.removeItem('token');
        router.push('/login');
    });
}

export function listReports(){
    reloadData();
    let ruta = import.meta.env.VITE_APP_URL_API;
    return  axios.get(`${ruta}/list-reports`);
}

export function addReport(title, start, end){
    reloadData();
    let ruta = import.meta.env.VITE_APP_URL_API;
    return  axios.post(`${ruta}/generate-report`, {
        title : title, 
        start_date : start, 
        end_date : end
    });
}

export function downloadReport(id){
    reloadData();
    let ruta = import.meta.env.VITE_APP_URL_API;
    return axios({
        method: 'get',
        url: `${ruta}/get-report/`+id,
        responseType: 'arraybuffer', 
     });
}
