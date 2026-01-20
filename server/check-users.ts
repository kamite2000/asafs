import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Database Users ---');
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log('No users found in the database.');
    
    // Suggest creating an admin user if missing
    const email = 'admin@asafs.com';
    const password = 'adminpassword123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    console.log(`Creating default admin user: ${email} / ${password}`);
    
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin'
      }
    });
    console.log('Admin user created successfully.');
  } else {
    users.forEach(u => {
      console.log(`- ${u.name} (${u.email}) [${u.role}]`);
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
