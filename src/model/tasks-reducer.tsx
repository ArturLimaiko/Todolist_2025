import {Task, TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

//начальное состояние---------------------------------------------------------------------------------------
let initialState: TasksState = {}

//возвращаемые типы экшонов----------------------------------------------------------------------------------------------
export type deleteTaskAction = ReturnType<typeof deleteTaskAC>
export type createTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
//типизация общая-------------------------------------------------------------------------------------------
type Actions =
    | CreateTodolistAction
    | DeleteTodolistAction
    | deleteTaskAction
    | createTaskAction
    | changeTaskStatusAction
//action creator's------------------------------------------------------------------------------------------
export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {type: 'delete_task', payload} as const
}

export const createTaskAC = (payload: { todolistId: string, title: string }) => {
    return {type: 'create_task', payload} as const
}

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {type: 'change_task_status', payload} as const
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
        case 'create_task': {
            const newTask: Task = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'change_task_status': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, isDone: action.payload.isDone}
                    : task
                )
            }
        }
        default :
            return state
    }
}

