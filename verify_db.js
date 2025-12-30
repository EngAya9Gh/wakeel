const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to connect to database...');
        const contact = await prisma.contactSubmission.create({
            data: {
                name: 'Test Setup',
                email: 'test@example.com',
                message: 'This is a test message from the verification script.',
                subject: 'Database Verification'
            }
        });
        console.log('✅ Successfully created contact submission:', contact);
    } catch (e) {
        console.error('❌ Error writing to database:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
