import express from 'express'
import cors from 'cors'
import boom from 'express-boom'

import connectDB from './config/db'

import userRoutes from './routes/users'

const app = express()

connectDB()

app.use(boom())
app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));