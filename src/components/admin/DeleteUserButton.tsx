'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteUser } from '@/actions/admin/users';

export default function DeleteUserButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this user?')) {
            setIsDeleting(true);
            try {
                await deleteUser(id);
            } catch (error: any) {
                alert(error.message || 'Failed to delete user');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
                padding: '0.5rem',
                borderRadius: '8px',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                border: 'none',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                opacity: isDeleting ? 0.5 : 1
            }}
            title="Delete User"
        >
            <Trash2 size={18} />
        </button>
    );
}
