//                       ip de la computadora:puerto
var socket = io.connect('http://10.213.162.211:6677', {'forceNew': true});

//evento emitido en index.js
socket.on('messages', function(data) {
  console.log(data);
  render(data);
});


function render(data) {
  //map para recorrer la data, itera los elementos del array.
  var html = data.map(function(message, index) {
    return (`
        <div class="message">
          <strong>${message.nickname}</strong>
          <p>${message.text}</p>
        </div>
      `);
  }).join(' ');

  var div_msgs = document.getElementById('messages');
  div_msgs.innerHTML = html;
  div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
  var message = {
    nickname: document.getElementById('nickname').value,
    text: document.getElementById('text').value
  };

  document.getElementById('nickname').style.display = 'none';
  socket.emit('add-message', message);

  return false;
}
