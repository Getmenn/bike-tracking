import { Api } from '@mui/icons-material';
import axios from 'axios';



/* export const mainAuto = axios.create({
    baseURL: 'https://sf-final-project-be.herokuapp.com/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        //актуальное значение не приходит при вызове, пока не обновлю страницу
    }
}); */

/* export const setToken = (token) => {
    token = localStorage.getItem('token')
    return token === null
      ? delete main.defaults.headers.common.Authorization
      : (main.defaults.headers.common.Authorization = `Bearer ${token}`);
}; */


  
export const main = axios.create({
    baseURL: 'https://sf-final-project-be.herokuapp.com/'
});

main.interceptors.request.use(request =>{
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return request}
)


