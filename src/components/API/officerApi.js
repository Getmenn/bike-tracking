import { mainAuto } from "./Api";

export const officerApi = {
    
    newOfficer: async (officer, token) => { //создание сотрудника
        
        const response = await mainAuto.post('/api/officers', officer);
        return console.log(response.data); 
    }
}