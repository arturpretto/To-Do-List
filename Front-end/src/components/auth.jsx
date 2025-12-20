import styles from '../styles/Auth.module.css'
import { Link } from 'react-router-dom'

function Auth() {
    return (
        <div className={styles.main}>
            <div className={styles.auth}>
                <Link to='/login'><button className={styles.btn}>ENTRAR</button></Link>
                <Link to='/signup'><button className={styles.btn}>CADASTRAR-SE</button></Link>
            </div>
        </div>
    )
}

export default Auth