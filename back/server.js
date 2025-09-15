import express from 'express';
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

const prisma = new PrismaClient()
const app = express();

app.use(express.json())

app.post('/User', async (req, res) => {
    const userData = req.body

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })
    
    res.status(201).json({ message: 'Usuário criado.', data: userData })
})

app.get('/User', async (req, res) => {
    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
            email: req.query.email,
            name: req.query.name,
            password: req.query.password
            }
    })
    }

    res.status(200).json({ message: 'Usuários: ', data: users })
})

app.delete('/User/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário deletado.' })
})

app.put('/User/:id', async (req, res) => {
    const userData = req.body

    await prisma.user.put({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })

    res.status(201).json({ message: 'Usuário atualizado.', data: userData })
})

app.listen(3000)