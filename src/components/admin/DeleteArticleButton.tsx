'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteArticle } from '@/actions/admin/articles';

export default function DeleteArticleButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this article?')) {
            setIsDeleting(true);
            try {
                await deleteArticle(id);
            } catch (error) {
                console.error('Failed to delete article', error);
                alert('Failed to delete article');
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
        >
            <Trash2 size={18} />
        </button>
    );
}
