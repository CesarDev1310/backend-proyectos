import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { CreateProjectDto } from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    //Crear un nuevo proyecto
    async createProject(createProjectDto: CreateProjectDto, userId: string) {
        const newProject = this.projectRepository.create({
            ...createProjectDto,
            createdBy: { id: userId } as any
        });
        return await this.projectRepository.save(newProject);
    }

    //Obtener todos los proyectos
    async getAllProjects() {
        return await this.projectRepository.find({
            relations: {createdBy: true},
        });
    }

    //Obtener un proyecto por su ID
    async getProjectById(id: string) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: {createdBy: true},
        });

        if (!project) {
            throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
        }
        return project;
    }
    
    //actualizar un proyecto existente

    //eliminar un proyecto existente    

}
