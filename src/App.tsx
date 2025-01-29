import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";

export type Task = { id: number, title: string, isDone: boolean }
export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    //локальный стейт---------------------------------------------------------------------
    const [tasks, setTasks] = useState<Task[]>(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
            {id: 4, title: 'Redux', isDone: false},
            {id: 5, title: 'Typescript', isDone: false},
            {id: 6, title: 'RTK query', isDone: false},
        ]
    )

    //фильтрация тасок---------------------------------------------------------------------
    const [filter, setFilter] = useState<FilterValues>('all')
    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    //ф-ция удаления тасок---------------------------------------------------------------------
    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }

    //ф-ция фильтрации тасок--------------------------------------------------------------------
    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    return (
        <>
            <TodolistItem title={'What to learn'} changeFilter={changeFilter} tasks={filteredTasks} date={'date: '}
                          deleteTask={deleteTask}/>
        </>
    )
}