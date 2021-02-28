import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
    ]);

    if (!requiredRoles) return true;

    const {
      headers: { 'x-user-roles': userRoles },
    } = context.switchToHttp().getRequest();

    if (!userRoles) return false;

    return requiredRoles.some((role: string) =>
      userRoles.split(',').includes(role),
    );
  }
}
