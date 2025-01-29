import {FilterValues, Task} from "../App.tsx";
import {Button} from "./Button.tsx";
import {useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export const TodolistItem = ({title, tasks, date, deleteTask, changeFilter, createTask}: Props) => {
    // const inputRef = useRef<HTMLInputElement>(null); // <input> привязан к inputRef.
    const [taskTitle, setTaskTitle] = useState('')

    //логика создания таски
    const createTaskHandler = () => {
        createTask(taskTitle) // Создаём таску
        setTaskTitle('') // Очищаем input после создания таски
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={(event) => setTaskTitle(event.currentTarget.value)}/>
                <Button title={'+'} onClick={createTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                )
                : (<ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}><span>{task.title}</span>
                                <Button title={'x'} onClick={() => deleteTask(task.id)}/>
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