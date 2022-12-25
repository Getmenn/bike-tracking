import { main } from "./Api";

export const reportApi = {
    newReportNoLogin: async (theft) => { //без авторизации
        const response = await main.post(`/api/public/report`, theft);
        return console.log(response.data);
    },
    newReport: async (theft) => { //с авторизации не работает
        const response = await main.post(`/api/cases/`, theft);
        return console.log(response.data, 'newReport');
    },
    getAllReports: async () => { // не работает
        const response = await main.get(`/api/cases`);
        return console.log(response);
    }
}