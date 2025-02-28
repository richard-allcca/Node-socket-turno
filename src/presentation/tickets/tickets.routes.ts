import { Router } from "express";
import { TicketsController } from "./tickets.controller";
import { TicketService } from "../services/ticket.service";


export class TicketRoutes {


  constructor(){}

  static get routes() {

    const router = Router();

    const ticketService = new TicketService();

    const ticketController = new TicketsController( ticketService );

    router.get('/', ticketController.getAllTickets);
    router.get('/last', ticketController.getLastTicket);
    router.get('/pending', ticketController.getPendingTickets);

    router.post('/', ticketController.createTicket);

    router.put('/draw/:desk', ticketController.drawTicket);
    router.put('/done/:ticketId', ticketController.doneTicket);

    router.get('/working-on', ticketController.getWorkingTicket);

    return router

  }

}