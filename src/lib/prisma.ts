import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

let prisma: PrismaClientSingleton;

if (process.env.NODE_ENV === 'production') {
    prisma = prismaClientSingleton();
} else {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = prismaClientSingleton();
    }
    // Check if the current client is stale (missing new models)
    // @ts-ignore
    if (globalForPrisma.prisma && !globalForPrisma.prisma.siteSettings) {
        console.warn('Prisma: siteSettings is missing on the client. Re-instantiating...');
        globalForPrisma.prisma = prismaClientSingleton();
    }
    prisma = globalForPrisma.prisma;
}

export default prisma;
