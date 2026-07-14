import { IsEnum, IsNotEmpty } from 'class-validator';

//Definiendo los estados de las tareas
export enum TaskStatus {
  PENDING = 'Pendiente',
  IN_PROGRESS = 'En Progreso',
  COMPLETED = 'Completado',
}

export class UpdateTaskStatusDto {
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status!: TaskStatus;
}
