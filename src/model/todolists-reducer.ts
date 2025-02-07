import {Todolist} from "../App.tsx";
import {v1} from "uuid";

//начальное состояние---------------------------------------------------------------------------------------
let initialState: Todolist[] = []

//возвращаемые типы экшонов----------------------------------------------------------------------------------------------
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

//типизация общая-------------------------------------------------------------------------------------------
type Actions = DeleteTodolistAction | CreateTodolistAction

//action creator's------------------------------------------------------------------------------------------
export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const
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
    }
}

