 import { UuiAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/ticket";
import { WssService } from "./wss.service";

export class TicketService {

	constructor(
		private readonly wssService = WssService.instance,
	) {}

	// Obtener tickets pendientes
	public get pendingTickets(): Ticket[] {
		return this._tickets.filter(ticket => !ticket.done && !ticket.handleAtDesk);
	}

	// Obtener el último ticket
	public get lastTicket() {
		const lastTicketNumber = this._tickets.length > 0
			? this._tickets[this._tickets.length - 1].number
			: 0;

		return lastTicketNumber;
	}

	// Obtener tickets en proceso
	public get workingTickets(): Ticket[] {
		return this._tickets.filter(ticket => ticket.done !== true && ticket.handleAtDesk).splice(0, 4);
	}

	// Obtener los últimos tickets en proceso
	public get lastWorkingTickets(): Ticket[] {
		const tickets = this.workingTickets.slice(0, 4);
		if (tickets.length > 0) {
			return tickets;
		}
		return [];
	}

	// Obtener todos los tickets
	public get getAllTickets() {
		return this._tickets;
	}

	// Crear un nuevo ticket
	public createTicket() {
		const ticket = {
			id: UuiAdapter.v4(),
			number: this.lastTicket + 1,
			createdAt: new Date(),
			done: false,
		};

		this._tickets.push(ticket);
		this.onTicketNumberChanged();

		return ticket;
	}

	// Asignar un ticket a un escritorio
	public drawTicket(desk: string) {
		const ticket = this.pendingTickets[0];

		if (!ticket) return { status: 404, message: 'No pending tickets' };

		if (ticket) {
			ticket.handleAtDesk = desk;
			ticket.handleAt = new Date();
		}

		// Add ticket to working tickets
		this.workingTickets.unshift(ticket);
		this.onTicketNumberChanged();

		return { status: 200, ticket };
	}

	// Marcar un ticket como completado
	public doneTicket(ticketId: string) {
		const ticket = this._tickets.find(ticket => {
			return ticket.id === ticketId
		})
		if (!ticket) return { status: 404, message: 'Ticket not found' };

		if (ticket) {
			ticket.done = true;
		}

		return { status: 200, ticket };
	}

	private onTicketNumberChanged() {
		this.wssService.sendMessages('on-ticket-count-changed', this.pendingTickets.length);
	}

	// Lista de tickets
	private _tickets: Ticket[] = [
		{
			id: UuiAdapter.v4(),
			number: 1,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 2,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 3,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 4,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 5,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 6,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 7,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 8,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 9,
			createdAt: new Date(),
			done: false,
		},
		{
			id: UuiAdapter.v4(),
			number: 10,
			createdAt: new Date(),
			done: false,
		},
	];
}
