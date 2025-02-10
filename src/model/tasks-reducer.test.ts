import {beforeEach, expect, test} from 'vitest'
import type {TasksState} from '../App'
import {createTaskAC, deleteTaskAC, tasksReducer} from "./tasks-reducer.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

//создания тудулиста----------------------------------------------------------------------------------------------------
test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist')) //принимает старый стейт и экшон и возвращает новый стейт

    const keys = Object.keys(endState)//создаёт массив всех ключей(ID тудулистов)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')//Ищем среди ключей endState тот, которого не было в startState
    if (!newKey) {//Если find(...) вернёт undefined, значит новый тудулист не создался, и тест должен упасть.
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

//удаление тудулиста ---------------------------------------------------------------------------------------------------
test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

//удаление таски--------------------------------------------------------------------------------------------------------
test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({todolistId: 'todolistId2', taskId: '2'})
    )

    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
})

//создание таски--------------------------------------------------------------------------------------------------------
test('correct task should be created at correct array', () => {
    const endState = tasksReducer(
        startState,
        createTaskAC({todolistId: 'todolistId2', title: 'juice'})
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].title).toBe('juice')
    expect(endState.todolistId2[0].isDone).toBe(false)
})