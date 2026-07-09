import { Injectable } from '@nestjs/common';
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

}
