import styles from '@/styles/Footer.module.scss'
import Link from 'next/link'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; 2021</p>
            <p>
                <Link href="/about">
                    About
                </Link>
            </p>
        </footer>
    )
}

export default Footer
