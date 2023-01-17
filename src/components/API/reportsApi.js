import { main, setToken } from "./Api";

export const reportApi = {
    newReportNoLogin: async (theft) => { //без авторизации
        await main.post(`/api/public/report`, theft);
        //return console.log(response.data);
    },
    newReport: async (theft) => { //с авторизациией
        await main.post(`/api/cases/`, theft);
        //return console.log(response.data);
    },
    getAllReports: async () => { // получение случаев краж
        try {
            const response = await main.get(`/api/cases`);
            return response.data.data;
        } catch (error) {
            return null
        }
    },
    editReport: async (id, theft) => { // редaктирование кражи
        await main.put (`/api/cases/${id}`, theft);
        //return console.log(response.data); 
    },
    deleteReport: async (id) => { // редaктирование кражи
        await main.delete (`/api/cases/${id}`);
        //return console.log(response.data); 
    },
    getReport:async (id) => { // получение информации по конкретному сообщению о краже
        const response = await main.get (`/api/cases/${id}`);
        return response.data.data; 
    }
}