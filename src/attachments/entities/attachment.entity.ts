import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('attachments')
export class Attachment {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'varchar', length: 250 })
    filename!: string;

    @Column({type: 'varchar', length: 500 })
    path!: string;

    @Column({type: 'varchar', length: 100 })
    mimetype!: string; //application/pdf, image/png, image/jpeg, etc.

    @ManyToOne(() => Task, task => task.attachments, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'task_id' })
    task!: Task;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'uploaded_by' })
    uploadedBy!: User;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date = new Date();
}