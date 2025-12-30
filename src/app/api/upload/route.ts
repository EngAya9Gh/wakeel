import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate a unique filename
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;

        // Path to save the file
        const path = join(process.cwd(), 'public/uploads', fileName);

        await writeFile(path, buffer);

        const fileUrl = `/uploads/${fileName}`;

        return NextResponse.json({ url: fileUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
