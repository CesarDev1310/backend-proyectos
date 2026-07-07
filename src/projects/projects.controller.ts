import { Body, Controller, Post, Req, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService
    ) {}

    @Post('register')
    @Roles('Gerente', 'Líder de Proyecto') // Solo usuarios con rol 'Líder de Proyecto' o 'Administrador' pueden crear proyectos
    async createProject(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
        const userId = req.user.sub; // Obtener el ID del usuario autenticado desde el request
        return await this.projectsService.createProject(createProjectDto, userId);
    }

    @Get("todos")
    @Roles('Líder de Proyecto', 'Administrador', 'Gerente') // Todos los roles pueden ver los proyectos
    async getAllProjects() {
        return await this.projectsService.getAllProjects();
    }
}
