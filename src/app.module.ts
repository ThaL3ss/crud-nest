import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, PrismaModule, ContactsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}