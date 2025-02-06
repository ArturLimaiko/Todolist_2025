import {Todolist} from "../App.tsx";

//начальное состояние
let initialState: Todolist[] = []

//типизация инструкции
type Actions = { type: string,payload: any }


export const todolistsReducer = (state : Todolist[] = initialState, action:Actions): Todolist[] => {

    return state
}