'use client';

import { useState } from 'react';
import styles from '@/app/[locale]/admin/admin.module.css';
import { useRouter } from '@/i18n/routing';
import { createArticle, updateArticle } from '@/actions/admin/articles';
import { Article } from '@prisma/client';
import { Upload, X } from 'lucide-react';

type ArticleFormProps = {
    article?: Article;
    isEditing?: boolean;
    locale: string;
};

export default function ArticleForm({ article, isEditing = false, locale }: ArticleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState(article?.image || '');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            setImageUrl(data.url);
        } catch (err) {
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        formData.set('image', imageUrl);

        try {
            if (isEditing && article) {
                await updateArticle(article.id, formData);
            } else {
                await createArticle(formData);
            }
            router.push('/admin/articles');
            router.refresh();
        } catch (err: any) {
            console.error('Article submit error:', err);
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.glassCard} style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {error && (
                <div style={{ padding: '1rem', background: '#FEE2E2', color: '#DC2626', borderRadius: '12px' }}>
                    {error}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* English Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#64748B' }}>🇬🇧 English Content</h3>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Title (EN)</label>
                        <input
                            name="title_en"
                            defaultValue={article?.title_en}
                            required
                            className={styles.input}
                            placeholder="Article Title"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Slug (EN)</label>
                        <input
                            name="slug_en"
                            defaultValue={article?.slug_en}
                            required
                            className={styles.input}
                            placeholder="article-slug"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Content (EN)</label>
                        <textarea
                            name="content_en"
                            defaultValue={article?.content_en}
                            required
                            className={styles.input}
                            style={{ minHeight: '300px', resize: 'vertical' }}
                            placeholder="# Markdown supported content..."
                        />
                    </div>

                    <h4 style={{ color: '#64748B', marginTop: '1rem', borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>🔍 SEO Meta (EN)</h4>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Meta Title (EN)</label>
                        <input
                            name="meta_title_en"
                            defaultValue={article?.meta_title_en || ''}
                            className={styles.input}
                            placeholder="SEO Browser Title"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Meta Description (EN)</label>
                        <textarea
                            name="meta_description_en"
                            defaultValue={article?.meta_description_en || ''}
                            className={styles.input}
                            style={{ minHeight: '80px', resize: 'vertical' }}
                            placeholder="SEO description for search results..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Meta Keywords (EN)</label>
                        <input
                            name="meta_keywords_en"
                            defaultValue={article?.meta_keywords_en || ''}
                            className={styles.input}
                            placeholder="keyword1, keyword2, keyword3"
                        />
                    </div>
                </div>

                {/* Arabic Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', direction: 'rtl' }}>
                    <h3 style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#64748B' }}>🇸🇦 المحتوى العربي</h3>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>العنوان (AR)</label>
                        <input
                            name="title_ar"
                            defaultValue={article?.title_ar}
                            required
                            className={styles.input}
                            placeholder="عنوان المقال"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>الرابط (Slug AR)</label>
                        <input
                            name="slug_ar"
                            defaultValue={article?.slug_ar}
                            required
                            className={styles.input}
                            placeholder="رابط-المقال"
                            style={{ direction: 'ltr', textAlign: 'right' }}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>المحتوى (AR)</label>
                        <textarea
                            name="content_ar"
                            defaultValue={article?.content_ar}
                            required
                            className={styles.input}
                            style={{ minHeight: '300px', resize: 'vertical' }}
                            placeholder="# محتوى المقال (يدعم Markdown)..."
                        />
                    </div>

                    <h4 style={{ color: '#64748B', marginTop: '1rem', borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>🔍 تحسين محركات البحث SEO (AR)</h4>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>عنوان الميتا (Meta Title AR)</label>
                        <input
                            name="meta_title_ar"
                            defaultValue={article?.meta_title_ar || ''}
                            className={styles.input}
                            placeholder="عنوان البحث في المتصفح"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>وصف الميتا (Meta Description AR)</label>
                        <textarea
                            name="meta_description_ar"
                            defaultValue={article?.meta_description_ar || ''}
                            className={styles.input}
                            style={{ minHeight: '80px', resize: 'vertical' }}
                            placeholder="وصف مختصر لنتائج البحث..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>الكلمات المفتاحية (Meta Keywords AR)</label>
                        <input
                            name="meta_keywords_ar"
                            defaultValue={article?.meta_keywords_ar || ''}
                            className={styles.input}
                            placeholder="كلمة1, كلمة2, كلمة3"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                <label className={styles.label}>Featured Image</label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        border: '2px dashed #E2E8F0',
                        borderRadius: '24px',
                        padding: '2rem',
                        textAlign: 'center',
                        position: 'relative',
                        background: '#F8FAFC'
                    }}>
                        {imageUrl ? (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setImageUrl('')}
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        background: '#EF4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '28px',
                                        height: '28px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div style={{ padding: '2rem' }}>
                                <Upload size={48} color="#94A3B8" style={{ marginBottom: '1rem' }} />
                                <p style={{ color: '#64748B', fontWeight: 600 }}>
                                    {uploading ? 'Uploading...' : 'Click or drag to upload article image'}
                                </p>
                                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.5rem' }}>
                                    PNG, JPG or WebP (Max 5MB)
                                </p>
                            </div>
                        )}
                        {!imageUrl && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                            />
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label className={styles.label} style={{ fontSize: '0.85rem' }}>Or enter image URL manually</label>
                        <input
                            name="image"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={styles.input}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <button type="submit" disabled={loading} className={styles.button} style={{ width: 'auto', minWidth: '150px' }}>
                    {loading ? 'Saving...' : (isEditing ? 'Update Article' : 'Create Article')}
                </button>
            </div>
        </form>
    );
}
