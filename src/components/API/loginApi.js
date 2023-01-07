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
            return console.log(response.data); 
        } catch (error) {
            return null
        }
        
    },
    checkToken: async () => { //проверка токена
        try {
                const response = await main.get(`/api/auth/`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                return response;
            }
        catch (error) { 
            return console.log('Токен не валидный')
        } 
    }
}