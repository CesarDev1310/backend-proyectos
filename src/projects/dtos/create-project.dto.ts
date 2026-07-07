export class CreateProjectDto {
    name!: string;
    description?: string;
    budget?: number;
    start_date?: Date;
    end_date?: Date;
}