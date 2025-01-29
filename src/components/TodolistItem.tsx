import {FilterValues, Task} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent,KeyboardEvent ,useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export const TodolistItem = ({title, tasks, date, deleteTask, changeFilter, createTask}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')

    //логика создания таски
    const createTaskHandler = () => {
        createTask(taskTitle) // Создаём таску
        setTaskTitle('') // Очищаем input после создания таски
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={onKeyDownHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                )
                : (<ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () =>{deleteTask(task.id)}
                        return (
                            <li key={task.id}>
                                <input type={'checkbox'} checked={task.isDone} onChange={()=>{}}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>)}
            <div>{date}</div>
            <Button title={'all'} onClick={() => changeFilter('all')}/>
            <Button title={'active'} onClick={() => changeFilter('active')}/>
            <Button title={'completed'} onClick={() => changeFilter('completed')}/>
        </div>
    );
};