import { Module } from '@nestjs/common';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { Attachment } from './entities/attachment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Attachment])],    
    controllers: [AttachmentsController],
    providers: [AttachmentsService],
    exports: [AttachmentsService],
})
export class AttachmentsModule { }
