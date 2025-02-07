import {TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

//начальное состояние---------------------------------------------------------------------------------------
let initialState: TasksState = {}

//возвращаемые типы экшонов----------------------------------------------------------------------------------------------
export type deleteTaskAction = ReturnType<typeof deleteTaskAC>
//типизация общая-------------------------------------------------------------------------------------------
type Actions =
    | CreateTodolistAction
    | DeleteTodolistAction
    | deleteTaskAction
//action creator's------------------------------------------------------------------------------------------
export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {type: 'delete_task', payload} as const
}

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
        case 'delete_task': {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(task => task.id !== action.payload.taskId)
            }
        }

        default :
            return state
    }
}

