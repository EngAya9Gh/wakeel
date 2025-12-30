'use client';

import { useState } from 'react';
import styles from '@/app/[locale]/admin/admin.module.css';
import { useRouter } from '@/i18n/routing';
import { createUser, updateUser, resetUserPassword } from '@/actions/admin/users';
import { User, Role } from '@prisma/client';

type UserFormProps = {
    user?: User;
    isEditing?: boolean;
};

export default function UserForm({ user, isEditing = false }: UserFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newPass, setNewPass] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);

        try {
            if (isEditing && user) {
                await updateUser(user.id, formData);
            } else {
                await createUser(formData);
            }
            router.push('/admin/users');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!user || !newPass) return;
        if (!confirm('Are you sure you want to reset this password?')) return;

        setLoading(true);
        try {
            await resetUserPassword(user.id, newPass);
            alert('Password reset successfully');
            setNewPass('');
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <form onSubmit={handleSubmit} className={styles.glassCard} style={{ background: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input name="name" defaultValue={user?.name || ''} required className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input name="email" type="email" defaultValue={user?.email || ''} required className={styles.input} />
                    </div>
                    {!isEditing && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password</label>
                            <input name="password" type="password" required className={styles.input} />
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Role</label>
                        <select name="role" defaultValue={user?.role || Role.EDITOR} className={styles.input}>
                            <option value={Role.ADMIN}>Admin</option>
                            <option value={Role.EDITOR}>Editor</option>
                        </select>
                    </div>
                </div>

                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" disabled={loading} className={styles.button} style={{ width: 'auto' }}>
                        {loading ? 'Saving...' : (isEditing ? 'Update User' : 'Create User')}
                    </button>
                </div>
            </form>

            {isEditing && (
                <div className={styles.glassCard} style={{ background: 'white', border: '1px solid #fee2e2' }}>
                    <h3 style={{ color: '#dc2626', marginBottom: '1rem' }}>Reset Password</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="password"
                            placeholder="New password"
                            className={styles.input}
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            disabled={loading || !newPass}
                            className={styles.button}
                            style={{ background: '#dc2626', width: 'auto' }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
