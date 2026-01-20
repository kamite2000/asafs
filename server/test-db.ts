import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users found:', users.length);
    
    if (users.length === 0) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.default.hash('admin123', 12);
      await prisma.user.create({
        data: {
          email: 'admin@asafs.com',
          password: hashedPassword,
          name: 'Administrator',
          role: 'admin'
        }
      });
      console.log('Created default admin user: admin@asafs.com / admin123');
    }
    
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
