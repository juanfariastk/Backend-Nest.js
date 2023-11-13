import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "src/comments/dto/create-comment.dto";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class CommentsPrismaRepository{
    constructor(private prismaSvc:PrismaService){}

    async create(commentData: CreateCommentDto) {
        const finallyComment = await this.prismaSvc.comment.create({
            data: {
                comment: commentData.comment,
                user: {
                    connect: { id: parseInt(commentData.user_id) }
                },
                anouncement: {
                    connect: { id: parseInt(commentData.anouncement_id) }
                }
            }
        });

        return finallyComment;
    }

    async findAll(){
        const allComments = await this.prismaSvc.comment.findMany({include:{user:true}});
        return allComments;
    }

    async findOne(commentId:number){
        const findedComment  = await this.prismaSvc.comment.findUnique({where:{id:commentId}, include:{user:true}});
        return findedComment;
    }

    async findManyCommentByUserId(userId:number){
        const allComments = await this.prismaSvc.comment.findMany({where:{user_id:userId}, include:{user:true}});
        return allComments;
    }

    async findManyByAnouncementId(anouncementId:number){
        const allComments = await this.prismaSvc.comment.findMany({where:{anouncement_id:anouncementId}, include:{user:true}});
        return allComments;
    }

    async update(commentId:number, commentNewData:any){
        const updatedComment = await this.prismaSvc.comment.update({where:{id:commentId}, data:{...commentNewData}});
        return updatedComment;
    }

    async delete(commentId:number){
        await this.prismaSvc.comment.delete({where:{id:commentId}});
    }
}