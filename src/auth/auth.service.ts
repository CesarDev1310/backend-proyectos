import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    //Registro de un nuevo usuario
    async register(registerDto: RegisterDto) {
        const userExists = await this.userRepository.findOne({ where: { email: registerDto.email } });
        if (userExists) {
            throw new Error('el correo ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const newUser = this.userRepository.create({
            username: registerDto.username,
            email: registerDto.email,
            password_hash: hashedPassword,
            first_name: registerDto.first_name,
            last_name: registerDto.last_name
        });

        await this.userRepository.save(newUser);

        return { message: 'Usuario registrado exitosamente' };
    }


    //Login de un usuario existente
    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
        if (!user) {
            throw new Error('credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('credenciales inválidas');
        }

        if (!user.is_active) {
            throw new Error('Usuario no activo. Contacte al administrador.');
        }

        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            }
        }

    }



}
