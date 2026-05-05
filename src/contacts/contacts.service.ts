import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateContactDto) {
    return this.prisma.contact.create({ data: dto });
  }

  findAll() {
    return this.prisma.contact.findMany();
  }

  async findOne(id: number) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new NotFoundException(`Contato #${id} não encontrado`);
    return contact;
  }

  async update(id: number, dto: any) {
    await this.findOne(id);
    return this.prisma.contact.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.contact.delete({ where: { id } });
  }
}