import express from 'express'
import { PrismaClient } from '@prisma/client'

const taskRoutes = express.Router()
const prisma = new PrismaClient()

taskRoutes.post('/', async (req, res) => { })

taskRoutes.get('/', async (req, res) => {
    const userId = req.headers.authorization

    if (!userId) {
        res.status(401).send('Usuário não autorizado.')
    } else {
        try {
            const tasks = await prisma.task.findMany({
                where: {
                    userId: req.headers.authorization
                }
            })

            res.status(201).json(tasks)
        } catch (error) {
            res.status(500).send('Erro no servidor: ' + error)
        }
    }
})

export default taskRoutes