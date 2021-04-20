var express = require('express');
var app = require('express')();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = process.env.port || 8000;
const publicPath = path.join(__dirname, "../public")

app.use('/public', express.static(publicPath));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    // res.send("hello form maulik");
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