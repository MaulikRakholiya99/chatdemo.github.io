const socket = io('https://maulikchatdemonode.herokuapp.com/');

const form = document.getElementById('msg_iarea');
const messageinput = document.getElementById('msg_input');
const messageContainer = document.querySelector('.msger_chat');
console.log(messageContainer);
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = '<div class="msg-bubble">'+message+'</div>';
    messageElement.classList.add('msg');
    messageElement.classList.add(position + '-msg');
    // alert(messageContainer);
    messageContainer.append(messageElement);
    messageContainer.stop().animate({ scrollTop:messageContainer[0].scrollHeight}, 1000);
}

const name = prompt("Enter Your name");
socket.emit('new-user-joined', name);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = '';
})

socket.on('user-joined', name => {
    append(`${name} join the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});
