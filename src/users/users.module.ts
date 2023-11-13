import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AddressesModule } from 'src/adresses/addresses.module';
import { PrismaService } from 'src/database/prisma.service';
import { EmailService } from 'src/services/mail.service';
import { UserPrismaRepository } from './repositories/prisma/user-prisma.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports:[AddressesModule, MailerModule.forRoot({
    transport:{
      host:"smtp-mail.outlook.com",
      auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
      },
      default:{
        from:"teste@outlook.com"
      }
    }
  })],
  controllers: [UsersController],
  providers: [UsersService, PrismaService,EmailService ,UserPrismaRepository],
  exports:[UsersService]
})
export class UsersModule {}
