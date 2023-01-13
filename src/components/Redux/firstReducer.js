

const defaultState = {
    officers: []
}

export const mainReducer = (state = defaultState, action) =>{ //редьюсер чистая функция, принимает состояние и action
    switch(action.type){
        case 'ADD_ALL_OFFICERS':
            return {...state, officers: [...action.payload]}
       /*  case ADD_CUSTOMER:
            return {...state, customers: [...state.customers, action.payload]} // и всегда возвращает новый обьект состояния
        case REMOVE_CUSTOMERS:
            return {...state, customers: state.customers.filter( customer => customer.id !== action.payload)} */
        default:
            return state
    }
}

export const addAllOfficers = (payload) => ({type: 'ADD_ALL_OFFICERS', payload}) //экшен криейтор
/* export const removeCustomerAction = (payload) => ({type: REMOVE_CUSTOMERS, payload})
export const addManyCustomersAction  = (payload) => ({type: ADD_MANY_CUSTOMERS, payload}) */