import {FilterValues, Task, Todolist} from "../App.tsx";
import Button from '@mui/material/Button'
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from "../styles/TodolistItem.styles.ts.tsx";

type Props = {
    todolist: Todolist
    tasks: Task[]
    date?: string
    deleteTask: (todolistId: string, taskId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    createTodolist: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
        const {
            todolist: {id, title, filter},
            tasks,
            date,
            createTask,
            deleteTask,
            deleteTodolist,
            changeTodolistTitle,
            changeFilter,
            changeTaskStatus,
            changeTaskTitle
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

        const changeTodolistTitleHandler = (title: string) => {
            changeTodolistTitle(id, title)
        }
    const safeTasks = tasks || []; // Если tasks undefined, используем пустой массив
        return (
            <div>
                <div className="container">
                    <h3>
                        <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                    </h3>
                    <IconButton onClick={deleteTodolistHandler} aria-label="delete" size="small">
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </div>
                <div>
                    <CreateItemForm createItem={createTaskHandler}/>
                </div>

                {safeTasks.length  === 0 ? (
                        <p>Тасок нет</p>
                    )
                    : (<List>
                        {tasks.map(task => {
                            //удаление таски--------------------------------------------------------------------
                            const deleteTaskHandler = () => {
                                deleteTask(id, task.id)
                            }
                            //изменение статуса таски--------------------------------------------------------------------
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(id, task.id, newStatusValue)
                            }
                            //изменение названия таски-----------------------------------------------------------
                            const changeTaskTitleHandler = (title: string) => {
                                changeTaskTitle(id, task.id, title)
                            }

                            return (
                                <ListItem key={task.id}
                                          sx={getListItemSx(task.isDone)}>
                                    <div>
                                        <Checkbox size={'small'} checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    </div>
                                    <IconButton onClick={deleteTaskHandler} aria-label="delete" size="small">
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>)}
                <div>{date}</div>
                <Box sx={containerSx}>
                    <Button size={'small'}
                            variant={filter === 'all' ? 'outlined' : 'text'} color={'inherit'}
                            onClick={() => changeFilterHandler('all')}>all</Button>
                    <Button size={'small'}
                            variant={filter === 'active' ? 'outlined' : 'text'} color={'primary'}
                            onClick={() => changeFilterHandler('active')}>active</Button>
                    <Button size={'small'}
                            variant={filter === 'completed' ? 'outlined' : 'text'} color={'secondary'}
                            onClick={() => changeFilterHandler('completed')}>completed</Button>
                </Box>
            </div>
        );
    }
;