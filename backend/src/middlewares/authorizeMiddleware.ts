import { Request, Response, NextFunction } from 'express';
import { Ability, AbilityBuilder } from '@casl/ability';
import Prisma from '../db/prisma.js';
import { User } from '@prisma/client';

const defineAbilitiesFor = (user:User) => {
    const { can, build } = new AbilityBuilder(Ability);
  
    if (user.role === 'Owner') {
      can('create', 'Book');
      can('update', 'Book', { ownerId: user.id });
      can('delete', 'Book', { ownerId: user.id });
      can('read', 'Book', { ownerId: user.id });
    } else if (user.role === 'Admin') {
      can('manage', 'all');
    }
  
    return build();
  };
  
  const authorizeUser = (action: 'create' | 'read' | 'update' | 'delete' | 'manage', subject:'Book' | 'User' | 'all') => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
      const ability = defineAbilitiesFor(user);
  
      if (ability.can(action, subject)) {
        return next();
      } else {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }
    };
  };
  
  export default authorizeUser;