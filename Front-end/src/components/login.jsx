import styles from '../styles/Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import api from '../services/api.js'

export default function Login() {
    const [isLight, setLight] = useState(localStorage.getItem('theme') === 'light')

    const passwordRef = useRef()
    const emailRef = useRef()

    const navigate = useNavigate()

    const handler = async (e) => {
        e.preventDefault()

        try {
            const { data } = await api.post('/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })

            localStorage.setItem('userId', data)

            navigate('/tasks')
        } catch (error) {
            alert('Erro ao logar: ' + error)
        }
    }

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
                <div className={styles.authForm}>
                    <h1>LOG IN</h1>
                    <form className={styles.authForm} onSubmit={handler}>
                        <input type='text' placeholder='E-mail...' ref={emailRef} className={styles.input} />
                        <input type='password' placeholder='Password...' ref={passwordRef} className={styles.input} />
                        <button type='submit' className={styles.formButton}>ENTRAR</button>

                        <h3>Não tem uma conta? <Link to='/signup'><a>CADASTRAR-SE</a></Link></h3>
                    </form>
                </div>
            </div>
        </div>
    )
}