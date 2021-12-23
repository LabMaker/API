import { Ticket } from '@prisma/client';
import { CreateTicketDto, UpdateTicketDto } from '../dtos/create-ticket.dto';

export interface ITicketService {
  getTicket(serverId: string, ticketId: number): Promise<Ticket>;
  getTickets(serverId: string): Promise<Ticket[]>;
  createTicket(ticketDto: CreateTicketDto): Promise<Ticket>;
  updateConfig(
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> | Promise<null>;
  deleteTicket(id: number);
}
