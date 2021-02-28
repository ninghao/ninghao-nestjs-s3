import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride(
      'permissions',
      [context.getHandler()],
    );

    if (!requiredPermissions) return true;

    const {
      headers: { 'x-user-permissions': userPermissions },
    } = context.switchToHttp().getRequest();

    if (!userPermissions) return false;

    return requiredPermissions.some((permission: string) =>
      userPermissions.split(',').includes(permission),
    );
  }
}
