import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { CreateTicketDto } from '../dtos/create-ticket.dto';
import { ITicketService } from '../interfaces/ticket.interface';

@Controller('discord/ticket')
export class TicketController {
  constructor(
    @Inject('TICKET_SERVICE') private readonly ticketService: ITicketService,
  ) {}

  @Get('/:serverId/:ticketId')
  getTicket(
    @Param('serverId') serverId: string,
    @Param('ticketId') ticketId: string,
  ): Promise<Ticket> | any {
    return this.ticketService.getTicket(serverId, ticketId);
  }

  @Get('/:serverId')
  getTickets(@Param('serverId') serverId: string): Promise<Ticket[]> {
    return this.ticketService.getTickets(serverId);
  }

  @Post()
  createTicket(@Body() body: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.createTicket(body);
  }

  @Put()
  updateTicket(@Body() body: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.updateConfig(body);
  }

  @Delete('/:id')
  deleteTicket(@Param('id') id: number) {
    return this.ticketService.deleteTicket(id);
  }
}
