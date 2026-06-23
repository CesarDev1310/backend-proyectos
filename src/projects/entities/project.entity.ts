
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'varchar', length: 200, unique: true })
    name!: string;

    @Column({type: 'text', nullable: true })
    description?: string;

    @Column({type: 'decimal', precision: 15, scale: 2, nullable: true })
    budget?: number;

    @Column({type: 'date', nullable: true })
    start_date?: Date;

    @Column({type: 'date', nullable: true })
    end_date?: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    createdBy!: User;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date = new Date();
    
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date = new Date();

}
