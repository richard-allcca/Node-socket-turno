// Función para conectar a WebSockets
function connectToWebSockets() {
  // Crear una nueva conexión WebSocket
  const socket = new WebSocket('ws://localhost:3000/ws');

  // Evento que se dispara cuando se recibe un mensaje
  socket.onmessage = (event) => {
    console.log(event.data);
  };

  // Evento que se dispara cuando se cierra la conexión
  socket.onclose = (event) => {
    console.log('Connection closed');

    // Intento de reconexión cada 1.5 segundos
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);
  };

  // Evento que se dispara cuando se abre la conexión
  socket.onopen = (event) => {
    console.log('Connected');
  };
}

// Llamar a la función para conectar a WebSockets
connectToWebSockets();

