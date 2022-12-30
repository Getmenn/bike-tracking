import { main } from "./Api";

export const officerApi = {
    newOfficer: async (officer) => { //создание сотрудника
        const response = await main.post(`/api/officers`, officer);
        return console.log(response.data);
    }
}