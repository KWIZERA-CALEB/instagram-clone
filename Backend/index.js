import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/posts.route.js'
import messageRoutes from './routes/messages.route.js'
import { connectDB } from './database.js'
import cookieParser from "cookie-parser";
import { app, io, server } from './socket.js'
config()


app.use(cookieParser());
const corsOptions = {
    origin: [
        'http://localhost:5173',             
        'https://twikaapp.netlify.app' 
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())


server.listen(process.env.APP_PORT, () => {
    console.log(`App conected and running on port ${process.env.APP_PORT}`)
    connectDB()
})

// Routes
app.use('/api', authRoutes)
app.use('/api', postRoutes)
app.use('/api', messageRoutes)


