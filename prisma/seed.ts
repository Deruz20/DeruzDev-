import { PrismaClient } from '@prisma/client';
import { customers, invoices, revenue, users } from '../src/lib/placeholder-data';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');
  try {
    // 1. Delete all existing data
    console.log('Deleting existing data...');
    await prisma.invoice.deleteMany();
    await prisma.revenue.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.user.deleteMany();
    console.log('Existing data deleted.');

    // 2. Hash user passwords and seed users
    console.log('Seeding users...');
    const hashedUsers = users.map((user) => ({
      ...user,
      password: hashSync(user.password, 10),
    }));
    await prisma.user.createMany({
      data: hashedUsers,
      skipDuplicates: true,
    });
    console.log(`Seeded ${hashedUsers.length} users.`);

    // 3. Seed customers
    console.log('Seeding customers...');
    await prisma.customer.createMany({
      data: customers,
      skipDuplicates: true,
    });
    console.log(`Seeded ${customers.length} customers.`);

    // 4. Seed invoices
    console.log('Seeding invoices...');
    await prisma.invoice.createMany({
      data: invoices,
      skipDuplicates: true,
    });
    console.log(`Seeded ${invoices.length} invoices.`);

    // 5. Seed revenue
    console.log('Seeding revenue...');
    await prisma.revenue.createMany({
      data: revenue,
      skipDuplicates: true,
    });
    console.log(`Seeded ${revenue.length} revenue.`);

    console.log('Database seeding complete.');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
