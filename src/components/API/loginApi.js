import { main } from "./Api";


export const loginApi = {
    signUp: async (user) => { //создание учетной записи
        const response = await main.post(`/api/auth/sign_up`, user);
        return console.log(response);
    },
    signIn: async (user) => { //авторизация
        try {
            const response = await main.post(`/api/auth/sign_in`, user);
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('officerID', response.data.data.user.id)
            return response.data.data.user;
        } catch (error) {
            return null
        }
        
    },
    checkToken: async (token) => { //авторизация
        //try {
        //console.log(token);
            const response = await main.get(`/api/auth/`, token);
            return console.log(response);
       /*  } catch (error) {
            return console.log('Токен не валидный')
        } */
    }
}