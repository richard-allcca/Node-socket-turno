const $lblPending = document.getElementById("lbl-pending");
const $desk = document.getElementById("desk");
const $alert = document.getElementById("alert");
const $btnNextTicket = document.getElementById("btn-next-ticket");
const $btnFinishTicket = document.getElementById("btn-finish-ticket");
const $lblWorking = document.getElementById("lbl-working");

let escritorio = "";
let currentWorkingTicketId = null;

// Asignar escritorio obtenido del parámetro de la URL
const searchParams = new URLSearchParams(window.location.search);

escritorio = searchParams.get("ventanilla");


if (isNaN(Number(escritorio)) ) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

$desk.innerText = "Escritorio " + escritorio;

const checkCountTicketsPending = async (currentCountTicket = 0) => {
	if (currentCountTicket > 0) {
		$alert.classList.add("hidden");
		$btnNextTicket.disabled = false;
		// $lblPending.classList.remove("hidden");
	}

	if (currentCountTicket === 0) {
		$alert.classList.remove("hidden");
		$btnNextTicket.disabled = true;
		// $lblPending.classList.add("hidden");
	}

	$lblPending.innerText = currentCountTicket;
}

const getPendingTickets = async () => {
	const resp = await fetch("/api/tickets/pending").then((data) => data.json());
	checkCountTicketsPending(resp.length);
};

const getNextTicket = async () => {
	const { status, ticket } = await fetch(`/api/tickets/draw/${escritorio}`, {
		method: "PUT",
	}).then((data) => data.json());

	if (status !== 200) {
		$lblWorking.innerText = "No hay tickets pendientes";
		return;
	}

	currentWorkingTicketId = ticket.id;

	$lblWorking.innerText = `- ticket ${ticket.number}`;
}

const finishTicket = async (ticket) => {
	if (!ticket) return;

	const { status } = await fetch(`/api/tickets/done/${ticket}`, {
		method: "PUT",
	}).then((data) => data.json());

	if (status === 200) {
		$lblWorking.innerText = "Nadie";
		return;
	}
}

// Función para conectar a WebSockets
function connectToWebSockets() {

	// Crear una nueva conexión WebSocket
	const socket = new WebSocket("ws://localhost:3000/ws");

	// Evento que se dispara cuando se recibe un mensaje
	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.type !== "on-ticket-count-changed") return null;

		checkCountTicketsPending(data.payload);
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

// Listeners
$btnNextTicket.addEventListener("click", async () => {
	finishTicket(currentWorkingTicketId);
	getNextTicket();
});

$btnFinishTicket.addEventListener("click", async () => {
	finishTicket(currentWorkingTicketId);
});

getPendingTickets();
connectToWebSockets();
