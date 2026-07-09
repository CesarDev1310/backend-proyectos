export class CreateTaskDto {
    title!: string;
    description?: string;
    project_id!: string;
    assigned_to_id!: string;
    priority!: string;
    due_date!: Date;
}