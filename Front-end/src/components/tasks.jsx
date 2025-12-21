import styles from '../styles/Tasks.module.css'
import api from '../services/api.js'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleCheckBig, Trash2, Sun, Circle } from 'lucide-react';

export default function Tasks() {
    const [tasks, setTasks] = useState([])

    const titleRef = useRef()
    const dateRef = useRef()

    const userId = localStorage.getItem('userId')

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

    async function createTask(event) {
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

    async function completeTask(taskId, taskCompleted) {
        try {
            await api.put('/tasks', {
                id: taskId,
                completed: taskCompleted
            })
        } catch (error) {
            alert('Erro ao atualizar a tarefa: ' + error)
        }
    }

    async function deleteTask(taskId) {
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

    async function changeMode(event) {
        event.preventDefault()

        document.body.classList.toggle('light')
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <form onSubmit={createTask} className={styles.taskForm}>
                    <input type='text' placeholder='Insira uma nova tarefa...' ref={titleRef} className={styles.taskInput} />
                    <input type='datetime-local' ref={dateRef} />
                    <button type='submit'>ADICIONAR</button>

                    <Link to='/'><a>SAIR</a></Link>
                    <Sun onClick={changeMode} className={styles.colorMode} />
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