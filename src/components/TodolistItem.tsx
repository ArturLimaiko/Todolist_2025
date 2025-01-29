import {Task} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
    title: string
    tasks: Task[]
    date?: string
}

export const TodolistItem = ({title, tasks, date}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                )
                : (<ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>)}
            <div>{date}</div>
            <Button title={'all'}/>
            <Button title={'active'}/>
            <Button title={'completed'}/>
        </div>
    );
};