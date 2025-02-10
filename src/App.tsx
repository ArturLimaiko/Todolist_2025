import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useReducer, useState} from "react";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {containerSx} from "./styles/TodolistItem.styles.ts.tsx";
import {NavButton} from "./styles/NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.tsx";

export type Task = { id: string, title: string, isDone: boolean }
export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = { id: string, title: string, filter: FilterValues }
export type TasksState = Record<string, Task[]>
// export type TaskState = { [key:string]: Task[] } //так попоще
type ThemeMode = 'dark' | 'light'

export const App = () => {
    //локальное состояние с темой и изменение темы----------------------------------------------------------------------
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')
    const changeMode = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#f19e07',
            }
        }
    });

    //TODOLISTS---------------------------------------------------------------------------------------------------------
    //локальный стейт с тудулистами-----------------------------------------------------------------
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    //TASKS-------------------------------------------------------------------------------------------------------------
    //локальный стейт с тасками---------------------------------------------------------------------
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})


    //ф-ция создания тудулиста------------------------------------------------------------------
    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    //ф-ция удаления тудулиста--------------------------------------------------------------------
    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        /** Удаляем таски нужного тудулиста из стейта тасок: */
        delete tasks[todolistId]
        /** Устанавливаем в state копию объекта что бы реакт обновил данные*/
        dispatchToTasks(action)
    }

    //ф-ция изменения названия тудулиста-----------------------------------------------------------
    const changeTodolistTitle = (id: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({title, id}))
    }


    //ф-ция удаления тасок---------------------------------------------------------------------
    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC({todolistId, taskId}))
    }

    //ф-ция фильтрации тасок--------------------------------------------------------------------
    const changeFilter = (id: string, filter: FilterValues) => {
        dispatchToTodolists(changeTodolistFilterAC({id, filter}))
    }

    //ф-ция создания таски--------------------------------------------------------------------
    const createTask = (todolistId: string, title: string) => {
        dispatchToTasks(createTaskAC({todolistId, title}))
    }

    //ф-ция изменения статуса таски--------------------------------------------------------------------
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    //ф-ция изменения названия таски-----------------------------------------------------------
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }

    return (
        <div className='app'>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar sx={{mb: '30px'}} position="static">
                    <Toolbar>
                        <Container maxWidth='lg' sx={containerSx}>
                            <IconButton edge="start" size='small' aria-label='menu' color='inherit'>
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth='lg'>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm createItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(todolist => {
                            //фильтрация тасок---------------------------------------------------------------------
                            //для тудулиста берем первоначально все таски по айдишке
                            const todolistTasks = tasks[todolist.id]
                            let filteredTasks = todolistTasks
                            if (todolist.filter === 'active') {
                                filteredTasks = todolistTasks.filter(t => !t.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = todolistTasks.filter(t => t.isDone)
                            }
                            return (
                                <Grid key={todolist.id}>
                                    <Paper sx={{p: '0 30px 30px 30px'}}>
                                        <TodolistItem
                                            todolist={todolist}
                                            changeFilter={changeFilter}
                                            date={'date: '}
                                            tasks={filteredTasks}
                                            deleteTodolist={deleteTodolist}
                                            deleteTask={deleteTask}
                                            createTask={createTask}
                                            createTodolist={createTodolist}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}