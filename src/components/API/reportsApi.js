import { main, mainAuto } from "./Api";

export const reportApi = {
    newReportNoLogin: async (theft) => { //без авторизации
        const response = await main.post(`/api/public/report`, theft);
        return console.log(response.data);
    },
    newReport: async (theft) => { //с авторизациией
        const response = await mainAuto.post(`/api/cases/`, theft);
        return console.log(response.data);
    },
    getAllReports: async () => { // получение случаев краж
        const response = await mainAuto.get(`/api/cases`);
        return response.data.data;
    },
    editReport: async (id, theft) => { // редaктирование кражи
        const response = await mainAuto.put (`/api/cases/${id}`, theft);
        return console.log(response.data); 
    },
    deleteReport: async (id) => { // редaктирование кражи
        const response = await mainAuto.delete (`/api/cases/${id}`);
        return console.log(response.data); 
    },
    getReport:async (id) => { // получение информации по конкретному сообщению о краже
        const response = await mainAuto.get (`/api/cases/${id}`);
        return response.data.data; 
    }
}