import { Body, Get, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create.comment.dtos';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post('newComments/:taskId')
    async createComment(@Param('taskId') taskId: string, @Body() createCommentDto: CreateCommentDto, @Req() req: any) {
        const userId = req.user.sub;
        return await this.commentsService.createComment(taskId, userId, createCommentDto);
    }

    @Get('allComments/:taskId')
    async findAllComments(@Param('taskId') taskId: string) {
        return await this.commentsService.findAllCommentsByTaskId(taskId);
    }
}
