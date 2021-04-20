var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = process.env.port || 8000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port);

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined',name =>{
        users[socket.id]= name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    })
})