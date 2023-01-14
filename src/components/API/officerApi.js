import { mainAuto } from "./Api";

export const officerApi = {
    
    newOfficer: async (officer) => { //создание сотрудника 
        try {
            await mainAuto.post('/api/officers', officer);
            alert('Пользователь создан');
            //return console.log(response.data);
        }
        catch (error){            
            alert(error.response.data.message);
            //const errorStatus = error.then(error => error.data)
            return null
        }
    },
    getAllOfficers:  async () => { //получение всех сотрудников
        try {
            const response = await mainAuto.get('/api/officers');
            return response.data.officers;
        }
        catch (error){            
            alert('Ошибка');
            //const errorStatus = error.then(error => error.data)
            return null
        }
    },
    deleteOfficer: async (id) => { //удаление сотрудника
        try {
            await mainAuto.delete(`/api/officers/${id}`);
            //return console.log(response.data);
        }
        catch (error){            
            alert('Ошибка');
            return console.log(error.data)
        }
    },
    editOfficer: async (id, officer) => { //редактирование сотрудника
        try {
            await mainAuto.put(`/api/officers/${id}`, officer);
            //return console.log(response.data);
        }
        catch (error){            
            //alert('Ошибка');
            return console.log(error)
        }
    },
    getOfficer: async (id) => { //получение одного сотрудника
        try {
            const response = await mainAuto.get(`/api/officers/${id}`);
            return response.data.data;
        }
        catch (error){            
            //alert('Ошибка');
            return console.log(error)
        }
    },
}