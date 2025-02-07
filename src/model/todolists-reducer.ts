import {Todolist} from "../App.tsx";

//начальное состояние---------------------------------------------------------------------------------------
let initialState: Todolist[] = []

//типы экшонов----------------------------------------------------------------------------------------------
export type DeleteTodolistAction = {
    type: 'delete_todolist'
    payload: { id: string }
}
//типизация общая-------------------------------------------------------------------------------------------
type Actions = DeleteTodolistAction

//action creator's------------------------------------------------------------------------------------------
export const deleteTodolistAC = (id: string): DeleteTodolistAction => {
    return {type: 'delete_todolist', payload: {id}} as const
}
//REDUCER------------------------------------------------------------------------
export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {

    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
    }
}

