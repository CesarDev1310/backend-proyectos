import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AttachmentsService } from './attachments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class AttachmentsController {
    constructor(
        private readonly attachmentsService: AttachmentsService
    ) { }

    @Post(':taskId/attachments')
    @UseInterceptors(FileInterceptor('file', {
        //Configruar el disco
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            }
        })
    }))
    async uploadAttachment(
        @Param('taskId') taskId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 30 * 1024 * 1024 }), // 30MB ,
                    //new FileTypeValidator({ fileType: '.(jpg|jpeg|png|pdf|docx)' }),
                ],
            })
        ) file: Express.Multer.File,
        @Req() req: any
    ) {
        return await this.attachmentsService.saveAttachment(file, taskId, req.user.sub);

    }

    @Get(':taskId/attachments')
    async getAllAttachments(
        @Param('taskId') taskId: string
    ){
        return await this.attachmentsService.getAttachmentsByTask(taskId);

    }

}
