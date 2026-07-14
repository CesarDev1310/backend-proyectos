
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({length: 200 })
    title!: string;

    @Column({type: 'text', nullable: true })
    description?: string;

    @Column({default: 'Medium'})//Low, Medium, High
    priority!: string;

    @Column({default: 'Pending'})//Pending, In_Progress, Completed
    status!: string;

    @Column({type: 'date', nullable: true })
    due_date!: Date;
    
    @ManyToOne(() => Project, project => project.tasks)
    @JoinColumn({ name: 'project_id' })
    project!: Project;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'assigned_to' })
    assigned_to?: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    created_by!: User;

    @CreateDateColumn()
    created_at: Date = new Date();
    
    @CreateDateColumn()
    updated_at: Date = new Date();

    @OneToMany(() => Comment, comment => comment.task)
    comment!: Comment[];
}