import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({type: 'varchar', length: 50, unique: true })
    name!: string;

    @Column({type: 'varchar', length: 250, nullable: true })
    description?: string;
   
    @ManyToMany(() => User, user => user.roles)
    @JoinTable({
        name: 'user_roles', // Nombre de la tabla intermedia
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
    })
    users!: User[];
}