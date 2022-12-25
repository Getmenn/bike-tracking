

const defaultState = {
    officer: {}
}

export const mainReducer = (state = defaultState, action) =>{ //редьюсер чистая функция, принимает состояние и action
    switch(action.type){
        case 'ADD_OFFICER':
            return {...state, officer: {...action.payload}}
       /*  case ADD_CUSTOMER:
            return {...state, customers: [...state.customers, action.payload]} // и всегда возвращает новый обьект состояния
        case REMOVE_CUSTOMERS:
            return {...state, customers: state.customers.filter( customer => customer.id !== action.payload)} */
        default:
            return state
    }
}

export const addOfficer = (payload) => ({type: 'ADD_OFFICER', payload}) //экшен криейтор
/* export const removeCustomerAction = (payload) => ({type: REMOVE_CUSTOMERS, payload})
export const addManyCustomersAction  = (payload) => ({type: ADD_MANY_CUSTOMERS, payload}) */