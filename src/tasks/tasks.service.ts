import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) { }

    async createTask(createTaskDto: any, userId: string) {
        const newTask = this.taskRepository.create({
            ...createTaskDto,
            project: { id: createTaskDto.project_id },
            assigned_to: createTaskDto.assigned_to_id ? { id: createTaskDto.assigned_to_id } : null,
            created_by: { id: userId }
        });
        return await this.taskRepository.save(newTask);
    }

    async getAllTasks( projectId: string) {
        return await this.taskRepository.find({
            where: { project: { id: projectId } },
            relations: { project: true, assigned_to: true, created_by: true }
        });
    }

    
    async updateTaskStatus(taskId: string, status: string, userId: string): Promise<Task> {
        const task = await this.taskRepository.findOne({ 
            where: { id: taskId },
            relations: { assigned_to: true }
        });
        if (!task) {
            throw new NotFoundException(`Tarea con el ID ${taskId} no encontrada`);
        }

        if(task.assigned_to?.id !== userId) {
            throw new ForbiddenException('No tiene autorización para actualizar el estado de esta tarea');
        }

        task.status = status;
        task.updated_at = new Date();

        return await this.taskRepository.save(task);        
    }

}
