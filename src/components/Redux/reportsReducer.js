const defaultState = {
    reports: []
}

export const reportsReducer = (state = defaultState, action) =>{ //редьюсер чистая функция, принимает состояние и action
    switch(action.type){
        case 'ADD_ALL_REPORTS':
            return {...state, reports: [...action.payload]}
       /*  case ADD_CUSTOMER:
            return {...state, customers: [...state.customers, action.payload]} // и всегда возвращает новый обьект состояния
        case REMOVE_CUSTOMERS:
            return {...state, customers: state.customers.filter( customer => customer.id !== action.payload)} */
        default:
            return state
    }
}

export const addAllReports = (payload) => ({type: 'ADD_ALL_REPORTS', payload}) //экшен криейтор