// Capturar el elemento con al id 'lbl-new-ticket'
const lblNewTicket = document.getElementById("lbl-new-ticket");
const btnCreateTicket = document.getElementById("btn-create-ticket");

const getLastTicket = async () => {
	const resp = await fetch("/api/tickets/last").then(
		(data) => data.json()
	);
  lblNewTicket.innerText = resp || "Error";
};

// Asignar el valor del último ticket al elemento 'lbl-new-ticket'
getLastTicket()

const createTicket = async () => {
	const newTicketCreated = await fetch("/api/tickets/", {
		method: "POST",
	}).then((data) => data.json());

  lblNewTicket.innerText = `Nuevo ticket - ${newTicketCreated.number}`;
};

btnCreateTicket.addEventListener("click", createTicket );
