import { CanActivate, Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requeridRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requeridRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.roles) {
            return false;
        }

        const hasRole = () => requeridRoles.some((role: string) => user.roles.includes(role));
        if (!hasRole) {
            throw new ForbiddenException('Acceso denegado. No tiene permisos para acceder a este recurso');
        }

        return true;
    }
}