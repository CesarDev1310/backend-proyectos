import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dtos/create.comment.dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ){}

    async createComment( taskId: string, userId: string, CreateCommentDto: CreateCommentDto) {
        const newComment = this.commentRepository.create({
            ...CreateCommentDto,
            task: { id: taskId },
            user: { id: userId }
        });
        return await this.commentRepository.save(newComment);
    }
    
    async findAllCommentsByTaskId(taskId: string) {
        return await this.commentRepository.find({
            where: { task: { id: taskId } },
            relations: { user: true },
            order: { created_at: 'DESC' }
        });
    }

}
