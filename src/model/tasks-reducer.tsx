import {Task, TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

//начальное состояние---------------------------------------------------------------------------------------
const initialState: TasksState = {}

//возвращаемые типы экшонов----------------------------------------------------------------------------------------------
export type deleteTaskAction = ReturnType<typeof deleteTaskAC>
export type createTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

//типизация общая-------------------------------------------------------------------------------------------
type Actions = | CreateTodolistAction | DeleteTodolistAction | deleteTaskAction | createTaskAction
    | changeTaskStatusAction
    | changeTaskTitleAction

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
export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {type: 'change_task_title', payload} as const
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
            const {todolistId, title} = action.payload
            if (!state[todolistId]) {
                return state
            }

            const newTask: Task = {id: v1(), title, isDone: false}

            return {
                ...state, [todolistId]: [newTask, ...state[todolistId]]
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
        case 'change_task_title': {
            const title = action.payload.title
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId
                        ? {...task, title}
                        : task
                    )
            }
        }
        default :
            return state
    }
}

