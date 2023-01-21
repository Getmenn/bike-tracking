import { main } from "./Api";

export const loginApi = {
    signUp: async (user) => { //создание учетной записи
        await main.post(`/api/auth/sign_up`, user);
    },
    signIn: async (user) => { //авторизация
        try {
            const response = await main.post(`/api/auth/sign_in`, user);
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.data.user) ) 
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