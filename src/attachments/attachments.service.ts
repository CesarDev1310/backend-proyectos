import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttachmentsService {

    constructor(
        @InjectRepository(Attachment)
        private readonly attachmentRepository: Repository<Attachment>,
    ) { };

    //Guardar un nuevo attachment
    async saveAttachment(
        file: Express.Multer.File,
        taskId: string,
        userId: string
    ): Promise<Attachment> {

        try {
            const attachment = this.attachmentRepository.create({
                filename: file.originalname,
                path: file.path,
                mimetype: file.mimetype,
                task: { id: taskId },
                uploadedBy: { id: userId }
            });
            
            return await this.attachmentRepository.save(attachment);
            
        } catch (error) {
            throw new InternalServerErrorException(`No se pudo guardar el attachment`);
        }
    }

    // Obtener todos los attachments de una tarea
    async getAttachmentsByTask(taskId: string): Promise<Attachment[]> {
        try {
            return await this.attachmentRepository.find({
                where: { task: { id: taskId } },
                relations: { uploadedBy: true },
                select:{
                    id:true,
                    filename:true,
                    path: true,
                    mimetype:true,
                    created_at: true,
                    uploadedBy: {
                        id: true,
                        username:true
                    }
                }
            });
        } catch (error) {
            throw new InternalServerErrorException(`No se pudieron obtener los attachments`);
        }
    }

}
