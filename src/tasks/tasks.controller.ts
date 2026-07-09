import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post('register')
    @Roles('Gerente', 'Líder de Proyecto')
    async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
        const userId = req.user.sub;
        return await this.tasksService.createTask(createTaskDto, userId);
    }

    @Get('task/:projectId')
    @Roles('Gerente', 'Líder de Proyecto')
    async findAllTasks(@Param('projectId') projectId: string) {
        return await this.tasksService.getAllTasks(projectId);
    }
}
