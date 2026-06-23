import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({type: 'varchar', length: 50, unique: true })
    username!: string;

    @Column({type: 'varchar', length: 150, unique: true })
    email!: string;

    @Column({type: 'text'})
    password_hash!: string;
    
    @Column({type: 'varchar', length: 200, nullable: true })
    first_name?: string;

    @Column({type: 'varchar', length: 200, nullable: true })
    last_name?: string;

    @Column({type: 'boolean', default: true })
    is_active: boolean = true;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date = new Date();
    
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date = new Date();

}