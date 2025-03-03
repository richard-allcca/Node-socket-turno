const $lblTicket1 = document.getElementById('lbl-ticket-01');
const $lblTicket2 = document.getElementById('lbl-ticket-02');
const $lblTicket3 = document.getElementById('lbl-ticket-03');
const $lblTicket4 = document.getElementById('lbl-ticket-04');

const $lblDesk1 = document.getElementById('lbl-desk-01');
const $lblDesk2 = document.getElementById('lbl-desk-02');
const $lblDesk3 = document.getElementById('lbl-desk-03');
const $lblDesk4 = document.getElementById('lbl-desk-04');


const checkCountTicketsOnWorking = async (tickets) => {
	const ticketsOnWorking = await fetch('/api/tickets/working-on').then((data) => data.json());
	console.log("🚀 ~ checkCountTicketsOnWorking ~ ticketsOnWorking:", ticketsOnWorking)

	if (ticketsOnWorking.length === 0) return;

	for (let i = 0; i < ticketsOnWorking.length; i++) {
		const ticket = ticketsOnWorking[ i ];
		const { number, handleAtDesk } = ticket;

		if (i === 0) {
			$lblTicket1.innerText = `Ticket ${number}`;
			$lblDesk1.innerText = `Desk ${handleAtDesk}`;
		}

		if (i === 1) {
			$lblTicket2.innerText = `Ticket ${number}`;
			$lblDesk2.innerText = `Desk ${handleAtDesk}`;
		}

		if (i === 2) {
			$lblTicket3.innerText = `Ticket ${number}`;
			$lblDesk3.innerText = `Desk ${handleAtDesk}`;
		}

		if (i === 3) {
			$lblTicket4.innerText = `Ticket ${number}`;
			$lblDesk4.innerText = `Desk ${handleAtDesk}`;
		}
	}
};


// Función para conectar a WebSockets
function connectToWebSockets() {

	// Crear una nueva conexión WebSocket
	const socket = new WebSocket("ws://localhost:3000/ws");

	// Evento que se dispara cuando se recibe un mensaje
	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.type !== "on-ticket-count-changed") return null;

		checkCountTicketsOnWorking(data.payload);
	};

	socket.onclose = (event) => {
		console.log("Connection closed");

		// Intento de reconexión cada 1.5 segundos
		setTimeout(() => {
			console.log("retrying to connect");
			connectToWebSockets();
		}, 1500);
	};

	socket.onopen = (event) => {
		console.log("Connected");
	};
}


connectToWebSockets();
