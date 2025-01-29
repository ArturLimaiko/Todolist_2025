import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = { id: string, title: string, isDone: boolean }
export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    //локальный стейт---------------------------------------------------------------------
    const [tasks, setTasks] = useState<Task[]>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
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
    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }

    //ф-ция фильтрации тасок--------------------------------------------------------------------
    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    //ф-ция создания таски--------------------------------------------------------------------
    const createTask = (title:string) => {
        const newTask: Task = {id: v1(), title, isDone: false}
        const newTasks = [newTask,...tasks]
        setTasks(newTasks)
    }

    return (
        <>
            <TodolistItem title={'What to learn'}
                          changeFilter={changeFilter}
                          tasks={filteredTasks}
                          date={'date: '}
                          deleteTask={deleteTask}
                          createTask={createTask}
            />
        </>
    )
}