import styles from '../styles/Tasks.module.css'
import api from '../services/api.js'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleCheckBig, Trash2, Sun, Circle, LogOut } from 'lucide-react';

export default function Tasks() {
    const [tasks, setTasks] = useState([])
    const [isLight, setLight] = useState(localStorage.getItem('theme') === 'light')

    const titleRef = useRef()
    const dateRef = useRef()

    const userId = localStorage.getItem('userId')

    const createTask = async (event) => {
        event.preventDefault()

        try {
            await api.post('/tasks', {
                title: titleRef.current.value,
                date: dateRef.current.value,
                userId: userId
            })

            titleRef.current.value = ''
            dateRef.current.value = ''
        } catch (error) {
            alert('Erro ao cadastrar: ' + error)
        }
    }

    const completeTask = async (taskId, completed) => {
        try {
            await api.put('/tasks', {
                id: taskId,
                completed: completed
            })
        } catch (error) {
            alert('Erro ao atualizar a tarefa: ' + error)
        }
    }

    const deleteTask = async (taskId) => {
        try {
            await api.delete('/tasks', {
                data: {
                    id: taskId
                }
            })
        } catch (error) {
            alert('Erro ao deletar a tarefa: ' + error)
        }
    }

    useEffect(() => {
        async function LoadTasks() {
            const response = await api.get('/tasks', {
                headers: {
                    Authorization: userId
                }
            })

            setTasks(response.data)
        }

        if (userId) {
            LoadTasks()
        }
    })

    useEffect(() => {
        if (isLight) {
            localStorage.setItem('theme', 'light')
            document.body.classList.add('light')
        } else {
            localStorage.setItem('theme', 'dark')
            document.body.classList.remove('light')
        }
    }, [isLight])

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form onSubmit={createTask} className={styles.taskForm}>
                    <input type='text' placeholder='Insira uma nova tarefa...' ref={titleRef} className={styles.taskInput} />
                    <input type='datetime-local' ref={dateRef} />
                    <button type='submit'>ADICIONAR</button>

                    <Sun onClick={() => setLight(!isLight)} className={styles.colorMode} />
                    <Link to='/'><LogOut className={styles.logOut}/></Link>
                </form>
                <div className={styles.taskList}>
                    {tasks.map(task => {
                        const date = new Date(task.date)

                        const formatDate = date.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit'
                        })

                        const formatTime = date.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })

                        return (
                            <div key={task.id} className={styles.task}>
                                <span className={styles.spanContainer} role='button' onClick={() => completeTask(task.id, !task.completed)}>
                                    {task.completed ? <CircleCheckBig className={styles.iconButton} />
                                        : <Circle className={styles.iconButton} />}
                                </span>
                                <div className={styles.titleContainer}>
                                    {task.title}
                                </div>
                                <div className={styles.dateContainer}>
                                    <span>
                                        {formatDate}
                                    </span>
                                    <span>
                                        {formatTime}
                                    </span>
                                </div>
                                <span onClick={() => deleteTask(task.id)} className={styles.spanContainer}>
                                    <Trash2 className={styles.iconButton} />
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}