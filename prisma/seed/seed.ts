import { PrismaClient } from '@prisma/client';
import data from './data';

const prisma = new PrismaClient();

async function main() {
  await prisma.note.deleteMany();
  await prisma.category.deleteMany();

  await Promise.all(
    data.map(async (item) => {
      return prisma.category.create({
        data: {
          name: item.name,
          icon: item.icon,
          notes: { create: item.notes },
        },
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
