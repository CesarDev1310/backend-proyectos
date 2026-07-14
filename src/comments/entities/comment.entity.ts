
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    id!:string;

    @Column({type: 'text'})
    content!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Task, (task) => task.comment)
    @JoinColumn({ name: 'task_id' })
    task!: Task;

    @CreateDateColumn()
    created_at: Date = new Date();

}