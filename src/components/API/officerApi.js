import { main } from "./Api";

export const officerApi = {
    
    newOfficer: async (officer) => { //создание сотрудника 
        try {
            await main.post('/api/officers', officer);
            alert('Пользователь создан');
        }
        catch (error){            
            alert(error.response.data.message);
            return null
        }
    },
    getAllOfficers:  async () => { //получение всех сотрудников
        try {
            const response = await main.get('/api/officers');
            return response.data.officers;
        }
        catch (error){            
            alert('Ошибка');
            return null
        }
    },
    deleteOfficer: async (id) => { //удаление сотрудника
        try {
            await main.delete(`/api/officers/${id}`);
        }
        catch (error){            
            alert('Ошибка');
            return console.log(error.data)
        }
    },
    editOfficer: async (id, officer) => { //редактирование сотрудника
        try {
            await main.put(`/api/officers/${id}`, officer);;
        }
        catch (error){            
            return console.log(error)
        }
    },
    getOfficer: async (id) => { //получение одного сотрудника
        try {
            const response = await main.get(`/api/officers/${id}`);
            return response.data.data;
        }
        catch (error){            
            return console.log(error)
        }
    },
}