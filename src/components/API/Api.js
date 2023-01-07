import axios from 'axios';


export const main = axios.create({
    baseURL: 'https://sf-final-project-be.herokuapp.com/'
});

export const mainAuto = axios.create({
    baseURL: 'https://sf-final-project-be.herokuapp.com/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});
