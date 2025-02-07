import {Todolist} from "../App.tsx";

//начальное состояние
let initialState: Todolist[] = []

export type DeleteTodolistAction = {
    type: 'delete_todolist'
    payload: { id: string }
}

//типизация общая инструкции
type Actions = DeleteTodolistAction

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {

    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
    }
}