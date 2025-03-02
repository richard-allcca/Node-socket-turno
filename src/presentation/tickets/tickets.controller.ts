import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";


export class TicketsController {

  constructor(
    private readonly ticketService: TicketService,
  ) {}

  getAllTickets = async (req: Request, res: Response) => {
    const tickets = await this.ticketService.getAllTickets;
    res.json(tickets);
  };

  getLastTicket = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.lastTicket;
    res.json(ticket);
  };

  getPendingTickets = async (req: Request, res: Response) => {
    const tickets = await this.ticketService.pendingTickets;
    res.json(tickets);
  };

  createTicket = async (req: Request, res: Response) => {
    const ticket = await this.ticketService.createTicket();
    res.status(201).json(ticket);
  };

  drawTicket = async (req: Request, res: Response) => {
    const { desk } = req.params;
    const ticket = await this.ticketService.drawTicket(desk);

    return res.json(ticket);
  };

  doneTicket = async (req: Request, res: Response) => {
    const { ticketId } = req.params;
    const ticket = await this.ticketService.doneTicket(ticketId);

    if (ticket.status === 404) return res.status(404).json(ticket);

    return res.status(201).json(ticket);
  };

  getWorkingTicket = async (req: Request, res: Response) => {
    const tickets = await this.ticketService.lastWorkingTickets;
    res.json(tickets);
  };


}
