import axios from 'axios';


export const main = axios.create({
    baseURL: 'https://sf-final-project-be.herokuapp.com/'
});
