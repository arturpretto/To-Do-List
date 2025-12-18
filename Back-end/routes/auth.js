import express from 'express'
import { PrismaClient } from '@prisma/client'

const authRoutes = express.Router()
const prisma = new PrismaClient()

authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body
    let user

    if (!email) {
        res.status(401).send('Insira o e-mail.')
    } else {
        user = await prisma.user.findUnique({
            where: { email: email }
        })
    }

    if (user.password != password) {
        res.status(401).send('Usuário não encontrado.')
    } else {
        const userId = user.id
        res.status(201).json(userId)
    }
})

authRoutes.post('/sign', async (req, res) => {
    const email = req.body.email

    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!user) {
            const userCreate = await prisma.user.create({
                data: {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password
                }
            })

            res.status(201).json(userCreate)
        } else {
            res.status(500).json({ message: 'Usuário já cadastrado.' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário.' })
    }
})

authRoutes.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany()

        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários.' })
    }
})

authRoutes.delete('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir usuário.' })
    }
})

export default authRoutes