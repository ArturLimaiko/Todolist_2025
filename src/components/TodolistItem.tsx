import {FilterValues, Task, Todolist} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolistId: string, taskId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const TodolistItem = (props: Props) => {
        const {
            todolist: {id, title, filter},
            tasks,
            date,
            deleteTask,
            deleteTodolist,
            changeFilter,
            createTask,
            changeTaskStatus
        } = props

        const [taskTitle, setTaskTitle] = useState('')
        const [error, setError] = useState<string | null>(null)

        //логика создания таски--------------------------------------------------------------------
        const createTaskHandler = () => {
            const trimmedTitle = taskTitle.trim()//Убираем пробелы в начале и конце строки
            if (trimmedTitle !== '') {// проверяем что не пустая строка
                createTask(id, taskTitle) // Создаём таску
                setTaskTitle('') // Очищаем input после создания таски
            } else {
                setError('Title is required')
            }
        }

        //заголовок таски--------------------------------------------------------------------
        const changeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTaskTitle(e.currentTarget.value)
            setError(null) // убираем ошибку
        }

        //создание таски по нажатию Enter--------------------------------------------------------------------
        const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                createTaskHandler()
            }
        }

        //фильтрация тудулистов--------------------------------------------------------------------
        const changeFilterHandler = (filter: FilterValues) => {
            changeFilter(id, filter)
        }
        //ф-ция удаления тудулиста-----------------------------------------------------------------
        const deleteTodolistHandler = () => {
            deleteTodolist(id)
        }

        return (
            <div>
                <div className="container">
                    <h3>{title}</h3>
                    <Button title={'x'} onClick={deleteTodolistHandler}/>
                </div>
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
                            //удаление таски--------------------------------------------------------------------
                            const deleteTaskHandler = () => {
                                deleteTask(id, task.id)
                            }
                            //статус таски--------------------------------------------------------------------
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(id, task.id, newStatusValue)
                            }

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
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
                    title={'all'} onClick={() => changeFilterHandler('all')}/>
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'active'} onClick={() => changeFilterHandler('active')}/>
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'completed'} onClick={() => changeFilterHandler('completed')}/>
            </div>
        );
    }
;