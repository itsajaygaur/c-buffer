require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { Prisma } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//Record Pagination API route
app.get('/orders', async (req, res) => {
    const { page = 1, limit = 10, name, product, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    try {
        const conditions = [];

        if (name) {
            conditions.push(Prisma.sql`AND "User".name ILIKE ${`%${name}%`}`);
        }

        if (product) {
            conditions.push(Prisma.sql`AND "Order".product ILIKE ${`%${product}%`}`);
        }

        if (status) {
            conditions.push(Prisma.sql`AND "Order".status = ${status}`);
        }

        const whereClause = conditions.length 
            ? Prisma.sql` ${Prisma.join(conditions, ' ')}` 
            : Prisma.empty;

        const orders = await prisma.$queryRaw`
            SELECT 
                "Order".id as order_id,
                "Order".product,
                "Order"."orderDate",
                "Order".status,
                "User".id as user_id,
                "User".name as user_name,
                "User".email as user_email
            FROM "Order"
            INNER JOIN "User" ON "Order"."userId" = "User".id
            WHERE 1=1
            ${whereClause}
            ORDER BY "Order"."orderDate" DESC
            LIMIT ${Number(limit)}
            OFFSET ${offset}
        `;

        const [countResult] = await prisma.$queryRaw`
            SELECT COUNT(*)::integer as total_count
            FROM "Order"
            INNER JOIN "User" ON "Order"."userId" = "User".id
            WHERE 1=1
            ${whereClause}
        `;

        const formattedOrders = orders.map(order => ({
            id: Number(order.order_id),
            product: order.product,
            orderDate: order.orderDate,
            status: order.status,
            user: {
                id: Number(order.user_id),
                name: order.user_name,
                email: order.user_email
            }
        }));

        res.json({
            success: true,
            data: formattedOrders,
            pagination: {
                total: Number(countResult.total_count),
                page: Number(page),
                pageSize: Number(limit),
                totalPages: Math.ceil(Number(countResult.total_count) / Number(limit)),
            },
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'An error occurred',
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('error - ', err);
    res.status(500).json({ 
        success: false,
        error: 'An unexpected error occurred.',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
