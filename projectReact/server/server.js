const express=require('express')
const { Socket } = require('socket.io')
const app=express()
const server=require('http').createServer(app)
const io=require('socket.io')(server,{
    cors:{
        origin: '*'
    }
})
const PORT=process.env.PORT || 5000
var users={};
io.on('connection',(Socket)=>{
    Socket.on('login',data=>{
        users[data]=Socket;
        console.log(data)
    })
    
    console.log('connection successfully')
    Socket.on('message',data=>{
        console.log('message received on server',data.m)
        io.sockets.emit('message',data)
       
       
    })
    Socket.on('delivered',data=>{

        io.sockets.emit('readed',data)
    })
})

  

server.listen(PORT,()=>{
    console.log('server is listening to port',PORT)
})
