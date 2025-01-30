import {FilterValues, Task, Todolist} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolistId: string, taskId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    createTodolist: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const TodolistItem = (props: Props) => {
        const {
            todolist: {id, title, filter},
            tasks,
            date,
            createTask,
            deleteTask,
            deleteTodolist,
            changeFilter,
            changeTaskStatus
        } = props

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    // const createTodolistHandler = (id: string, title: string) => {
    //     createTodolist(id, title)
    // }

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
                    <CreateItemForm createItem={createTaskHandler}/>
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
                                    <EditableSpan value={task.title}/>
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