import { Module } from '@nestjs/common';
import { AddressesModule } from './adresses/addresses.module';
import { AnouncementsModule } from './anouncements/anouncements.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { CommentsModule } from './comments/comments.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthorizationModule, AnouncementsModule, CommentsModule, AddressesModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
