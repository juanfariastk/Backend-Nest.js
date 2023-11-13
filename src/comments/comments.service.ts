import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsPrismaRepository } from './repositories/prisma/comments-prisma.repository';

@Injectable()
export class CommentsService {
  constructor(private commentRepository: CommentsPrismaRepository){}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentRepository.create(createCommentDto);
    return newComment;
  }

  async findAll() {
    const allComments = await this.commentRepository.findAll();
    return allComments;
  }

  async findOne(id: number) {
    const findedComment = await this.commentRepository.findOne(id)
    if(!findedComment){
      throw new NotFoundException('This comment not found or not exists');
    }
    return findedComment;
  }

   async findMany(id:number){
    const allComments = await this.commentRepository.findManyByAnouncementId(id);
    if(!allComments){
      throw new NotFoundException('This comment not found or not exists');
    }
    return allComments;
   }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const findedComment = await this.commentRepository.findOne(id);
    if(!findedComment){
      throw new NotFoundException('This comment not found or not exists');
    }
    const updatedComment = await this.commentRepository.update(id, updateCommentDto);
    return updatedComment;
  }

  async remove(id: number) {
    const findedComment = await this.commentRepository.findOne(id);
    if(!findedComment){
      throw new NotFoundException('This comment not found or not exists');
    }
    await this.commentRepository.delete(id);
  }
}
