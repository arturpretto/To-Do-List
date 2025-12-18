import styles from '../styles/Tasks.module.css'
import api from '../../services/app.js'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Tasks() {
    const [tasks, setTasks] = useState([])

    const titleRef = useRef()
    const dateRef = useRef()

    const userId = localStorage.getItem('userId')

    const navigate = useNavigate()

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
                title: titleRef,
                date: dateRef,
                userId: userId
            })

            alert('Tarefa cadastrada.')
        } catch (error) {
            alert('Erro ao cadastrar: ' + error)
        }
    }

    return (
        <div>
            <form onSubmit={createTask}>
                <input type='text' placeholder='Insira uma nova tarefa...' ref={titleRef} /><input type='date' ref={dateRef} /><button type='submit'>CRIAR</button>
            </form>
            <div>
                {tasks.map(task => <p key={task.id}>{task.title} {task.date} {task.completed}</p>)}
            </div>
        </div>
    )
}

export default Tasks