import { main } from "./Api";

export const reportApi = {
    newReportNoLogin: async (theft) => { //без авторизации
        await main.post(`/api/public/report`, theft);
    },
    newReport: async (theft) => { //с авторизациией
        await main.post(`/api/cases/`, theft);
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
    },
    deleteReport: async (id) => { // редaктирование кражи
        await main.delete (`/api/cases/${id}`);
    },
    getReport: async (id) => { // получение информации по конкретному сообщению о краже
        const response = await main.get (`/api/cases/${id}`);
        return response.data.data; 
    }
}