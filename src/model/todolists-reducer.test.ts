import {v1} from 'uuid'
import {beforeEach, expect, test} from 'vitest'
import type {Todolist} from '../App'
import {changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer} from './todolists-reducer'

let todolistId1 : string;
let todolistId2 : string;
let startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

//удаления тудулиста
test('correct todolist should be deleted', () => {
    // 1. Стартовый state
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

//добавления тудулиста
test('correct todolist should be created', () => {
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

//изменение названия тудулиста
test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})