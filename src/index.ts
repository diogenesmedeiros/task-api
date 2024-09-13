import express, { Request, Response } from 'express'
import taskRoutes from './routes/Task.router'
import cors from 'cors';
import dotenv from 'dotenv';
import { Sync } from './database/SyncDatabase';

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: ['http://localhost:3000', 'https://taskflicker.vercel.app']
}));

app.use('/', taskRoutes)

Sync()

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})