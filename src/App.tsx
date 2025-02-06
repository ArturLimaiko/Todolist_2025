import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

export type Task = { id: string, title: string, isDone: boolean }
export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = { id: string, title: string, filter: FilterValues }
export type TaskState = Record<string, Task[]>
// export type TaskState = { [key:string]: Task[] } //так попоще
type ThemeMode = 'dark' | 'light'

export const App = () => {
    //локальное состояние с темой и изменение темы----------------------------------------------------------------------
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')
    const changeMode = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }
    const theme = createTheme({
        palette:{
            mode: themeMode,
            primary: {
                main: '#f19e07',
            }
        }
    });

    const todolistId1 = v1()
    const todolistId2 = v1()

    //TODOLISTS---------------------------------------------------------------------------------------------------------
    //локальный стейт с тудулистами-----------------------------------------------------------------
    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'Whats to learn', filter: 'all'},
        {id: todolistId2, title: 'Whats to buy', filter: 'all'},
    ])

    //ф-ция создания тудулиста------------------------------------------------------------------
    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    //ф-ция удаления тудулиста--------------------------------------------------------------------
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        /** Удаляем таски нужного тудулиста из стейта тасок: */
        delete tasks[todolistId]
        /** Устанавливаем в state копию объекта что бы реакт обновил данные*/
        setTasks({...tasks})
    }

    //ф-ция изменения названия тудулиста-----------------------------------------------------------
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
    }

    //TASKS-------------------------------------------------------------------------------------------------------------
    //локальный стейт с тасками---------------------------------------------------------------------
    const [tasks, setTasks] = useState<TaskState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ]
    })

    //ф-ция удаления тасок---------------------------------------------------------------------
    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    //ф-ция фильтрации тасок--------------------------------------------------------------------
    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id == todolistId ? {...todolist, filter} : todolist))
    }

    //ф-ция создания таски--------------------------------------------------------------------
    const createTask = (todolistId: string, title: string) => {
        const newTask: Task = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    //ф-ция создания таски--------------------------------------------------------------------
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    //ф-ция изменения названия таски-----------------------------------------------------------
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId
                ? {...task, title}
                : task)
        })
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
                                <NavButton >Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
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