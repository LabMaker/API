import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../../schemas/TicketSchema';
import { CreateTicketDto } from '../dtos/create-ticket.dto';
import { ITicketService } from '../interfaces/ticket.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TicketService implements ITicketService {
  constructor(
    @InjectModel(Ticket.name)
    private ticketRepository: Model<TicketDocument>,
  ) {}

  async getTicket(serverId: string, ticketId: string): Promise<Ticket> {
    return await this.ticketRepository.findOne({
      serverId,
      ticketId,
    });
  }

  async getTickets(serverId: string): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      serverId,
    });
  }

  async createTicket(newTicketDto: CreateTicketDto): Promise<Ticket> {
    newTicketDto._id = uuidv4();
    const createdTicket = new this.ticketRepository(newTicketDto);
    return await createdTicket.save();
  }

  async updateConfig(updateTicketDto: CreateTicketDto): Promise<any> {
    // const filter = {
    //   ticketId: updateTicketDto.ticketId,
    //   serverId: updateTicketDto.serverId,
    // };

    console.log(updateTicketDto);

    const filter = { _id: updateTicketDto._id };

    return await this.ticketRepository.findOneAndUpdate(
      filter,
      { ...updateTicketDto },
      {
        new: true,
        useFindAndModify: false,
      },
    );
  }

  async deleteTicket(_id: string) {
    return await this.ticketRepository.deleteOne({ _id });
  }
}
