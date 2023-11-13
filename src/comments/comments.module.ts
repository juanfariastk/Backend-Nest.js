import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsPrismaRepository } from './repositories/prisma/comments-prisma.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, CommentsPrismaRepository],
})
export class CommentsModule {}
