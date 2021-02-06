const express = require('express')
const socketIO = require('socket.io')

const app = express();

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000)
const io = socketIO(expressServer, {
  cors: {
    origin: 'http://localhost:9000/chat.html',
    methods: ["GET", "POST"],
    credentials: true
  }
})

io.on('connection', socket => {

  // One Client send a message
  socket.on('newMessageToServer', msg => {
    console.log(msg)

    // Send the message to every client
    io.emit('messageToClients', { text: msg.text })
  })
})
