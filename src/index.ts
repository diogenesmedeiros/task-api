import express, { Request, Response } from 'express'
import taskRoutes from './routes/Task.router'
import cors from 'cors'

const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: ['http://localhost:3000']
}));

app.get('/', (req: Request, res: Response) => {
    res.json({ "message": 'Hello World!'})
})

app.use('/task', taskRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})