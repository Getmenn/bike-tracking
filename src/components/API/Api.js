import axios from 'axios';
 
export const main = axios.create({
    baseURL: 'https://sf-final-project-be.herokuapp.com/'
});

main.interceptors.request.use(request =>{
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return request}
)


