import { Ticket } from '@prisma/client';
import { CreateTicketDto } from '../dtos/create-ticket.dto';

export interface ITicketService {
  getTicket(serverId: string, ticketId: string): Promise<Ticket>;
  getTickets(serverId: string): Promise<Ticket[]>;
  createTicket(ticketDto: CreateTicketDto): Promise<Ticket>;
  updateConfig(
    updateTicketDto: CreateTicketDto,
  ): Promise<Ticket> | Promise<null>;
  deleteTicket(id: number);
}
