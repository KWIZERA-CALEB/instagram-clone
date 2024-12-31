import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/posts.route.js'
import { connectDB } from './database.js'
import cookieParser from "cookie-parser";
config()


const app = express()

app.use(cookieParser());
const corsOptions = {
    origin: [
        'http://localhost:5173',             
        'https://boobix.vercel.app' 
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())


app.listen(process.env.APP_PORT, () => {
    console.log(`App conected and running on port ${process.env.APP_PORT}`)
    connectDB()
})

// Routes
app.use('/api', authRoutes)
app.use('/api', postRoutes)


