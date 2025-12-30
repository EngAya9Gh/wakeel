import LoginForm from '@/components/admin/LoginForm';
import styles from '../admin.module.css';

export default function LoginPage() {
    return (
        <div className={styles.loginContainer}>
            <LoginForm />
        </div>
    );
}
