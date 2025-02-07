import {TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

//начальное состояние---------------------------------------------------------------------------------------
let initialState: TasksState = {}

//возвращаемые типы экшонов----------------------------------------------------------------------------------------------

//типизация общая-------------------------------------------------------------------------------------------
type Actions =
    | CreateTodolistAction
    | DeleteTodolistAction
//action creator's------------------------------------------------------------------------------------------


//REDUCER------------------------------------------------------------------------
export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {

    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = {...state}//создаем копию стейта
            delete newState[action.payload.id] //удаляем по айди нужное свойство
            return newState // ретурним
        }


        default :
            return state
    }
}

