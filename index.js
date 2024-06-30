import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()


const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()


    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })

    res.status(201).json(req.body)
})


app.delete('/usuarios/:id', async (req,res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: "usuśrio deletado com sucesso!"})
})

app.listen(3000)


/*
    criar api de usuários

    -criar usuário
    -listar todos os usuários
    -editar usuários
    -deletar usuários
*/







/*
    get -> listar
    post -> criar
    put -> editar vários
    patch -> editar um
    delete -> deletar
*/