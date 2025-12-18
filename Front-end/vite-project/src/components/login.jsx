import styles from '../styles/Auth.module.css'
import { data, Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import api from '../../services/app.js'

function Login() {
    const passwordRef = useRef()
    const emailRef = useRef()

    const navigate = useNavigate()

    async function Handler(event) {
        event.preventDefault()

        try {
            const { data } = await api.post('/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })

            localStorage.setItem('userId', data)

            alert('Logado com sucesso.')

            navigate('/tasks')
        } catch(error) {
            alert('Erro ao logar: ' + error)
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.form}>
                    <h1>LOG IN</h1>
                    <form className={styles.form} onSubmit={Handler}>
                        <input type='text' placeholder='E-mail' ref={emailRef}></input>
                        <input type='password' placeholder='Password' ref={passwordRef}></input>
                        <button type='submit'>ENTRAR</button>

                        <h3>Não tem uma conta? <Link to='/signup'><a>CADASTRAR-SE</a></Link></h3>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login