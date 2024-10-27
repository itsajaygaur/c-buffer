const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 10; i++) {
        const user = await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                orders: {
                    create: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
                        product: faker.commerce.productName(),
                        orderDate: faker.date.past(),
                        status: faker.helpers.arrayElement(['shipped', 'pending', 'delivered']),
                    })),
                },
            },
        });

        console.log(`Created user with id: ${user.id}`);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
