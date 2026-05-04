const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@asafs.org' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@asafs.org',
        password: hashedPassword,
        name: 'Administrateur',
        role: 'admin'
      }
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@asafs.org');
    console.log('Password: admin123');
    console.log('Please change this password after first login.');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
