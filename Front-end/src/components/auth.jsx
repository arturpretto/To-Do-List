import styles from '../styles/Auth.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Sun } from 'lucide-react'

export default function Auth() {
    const [isLight, setLight] = useState(localStorage.getItem('theme') === 'light')

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
            <header>
                <Sun onClick={() => setLight(!isLight)} className={styles.colorMode} />
            </header>
            <div className={styles.authContainer}>
                <Link to='/login' className={styles.button}><button className={styles.button}>ENTRAR</button></Link>
                <Link to='/signup' className={styles.button}><button className={styles.button}>CADASTRAR-SE</button></Link>
            </div>
        </div>
    )
}