import styles from '../styles/Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import api from '../services/api.js'

export default function Signup() {
    const [isLight, setLight] = useState(localStorage.getItem('theme') === 'light')

    const nameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        if (isLight) {
            localStorage.setItem('theme', 'light')
            document.body.classList.add('light')
        } else {
            localStorage.setItem('theme', 'dark')
            document.body.classList.remove('light')
        }
    }, [isLight])

    async function Handler(e) {
        e.preventDefault()

        try {
            await api.post('/auth/sign', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            })

            alert('Usuário cadastrado.')

            navigate('/login')
        } catch (error) {
            alert('Erro ao cadastrar: ' + error)
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.authForm}>
                    <h1>CADASTRO</h1>
                    <form className={styles.authForm} onSubmit={Handler}>
                        <input type='text' placeholder='Name...' ref={nameRef} className={styles.input} />
                        <input type='text' placeholder='E-mail...' ref={emailRef} className={styles.input} />
                        <input type='password' placeholder='Password...' ref={passwordRef} className={styles.input} />
                        <button type='submit' className={styles.formButton}>CADASTRAR-SE</button>

                        <h3>Já tem uma conta? <Link to='/login'><a>ENTRAR</a></Link></h3>
                    </form>
                </div>
            </div>
        </div>
    )
}