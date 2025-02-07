import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

//начальное состояние---------------------------------------------------------------------------------------
let initialState: Todolist[] = []

//возвращаемые типы экшонов----------------------------------------------------------------------------------------------
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

//типизация общая-------------------------------------------------------------------------------------------
type Actions =
    | DeleteTodolistAction
    | CreateTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction

//action creator's------------------------------------------------------------------------------------------
export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
    return {type: 'change_todolist_title', payload} as const
}

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValues }) => {
    return {type: 'change_todolist_filter', payload} as const
}

//REDUCER------------------------------------------------------------------------
export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {

    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'change_todolist_title' : {
            const title = action.payload.title
            return state.map(t => t.id === action.payload.id ? {...t, title} : t)
        }
        case 'change_todolist_filter': {
            const filter = action.payload.filter
            return state.map(t => t.id === action.payload.id ? {...t, filter} : t)
        }
    }
}

