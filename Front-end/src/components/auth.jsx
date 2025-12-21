import styles from '../styles/Auth.module.css'
import { Link } from 'react-router-dom'

export default function Auth() {
    return (
        <div className={styles.main}>
            <div className={styles.authContainer}>
                <Link to='/login' className={styles.button}><button className={styles.button}>ENTRAR</button></Link>
                <Link to='/signup' className={styles.button}><button className={styles.button}>CADASTRAR-SE</button></Link>
            </div>
        </div>
    )
}