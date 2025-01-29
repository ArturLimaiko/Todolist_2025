import {FilterValues, Task} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter:FilterValues
}

export const TodolistItem = ({title, tasks, date, deleteTask, changeFilter, createTask, changeTaskStatus,filter}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    //логика создания таски
    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()//Убираем пробелы в начале и конце строки
        if (trimmedTitle !== '') {// проверяем что не пустая строка
            createTask(taskTitle) // Создаём таску
            setTaskTitle('') // Очищаем input после создания таски
        } else {
            setError('Title is required')
        }
    }

    const changeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null) // убираем ошибку
}

const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        createTaskHandler()
    }
}

return (
    <div>
        <h3>{title}</h3>
        <div>
            <input className={error ? 'error' : ''} value={taskTitle} onChange={changeNewTaskTitleHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button title={'+'} onClick={createTaskHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
        {tasks.length === 0 ? (
                <p>Тасок нет</p>
            )
            : (<ul>
                {tasks.map(task => {
                    const deleteTaskHandler = () => {
                        deleteTask(task.id)
                    }

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done': ''}>
                            <input type={'checkbox'} checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
                            <Button title={'x'} onClick={deleteTaskHandler}/>
                        </li>
                    )
                })}
            </ul>)}
        <div>{date}</div>
        <Button
            className={filter === 'all' ? 'active-filter' : ''}
            title={'all'} onClick={() => changeFilter('all')}/>
        <Button
            className={filter === 'active' ? 'active-filter' : ''}
            title={'active'} onClick={() => changeFilter('active')}/>
        <Button
            className={filter === 'completed' ? 'active-filter' : ''}
            title={'completed'} onClick={() => changeFilter('completed')}/>
    </div>
);
}
;