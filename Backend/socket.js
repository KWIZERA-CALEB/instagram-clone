import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',             
            'https://twikaapp.netlify.app' 
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }
})

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

const userSocketMap = {}

// check for socket connection and return a callback function
io.on("connection", (socket) => {
    console.log(`A user connected to socket ${socket.id}`)

    const userId = socket.handshake.query.userId

    if (userId) userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log(`A user connected to socket ${socket.id}`)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

export { app, io, server }