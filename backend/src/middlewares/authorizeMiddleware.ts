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
      can('read', 'Revenue', { ownerId: user.id });
    } else if (user.role === 'Admin') {
      can('manage', 'all');
      can('disable', 'User');
    }else if(user.role === 'Renter'){
      can('read', 'Book');
      can('rent', 'Book',{ status: 'available' });
    }
  
    return build();
  };
  
  const authorizeUser = (action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'rent' | 'disable', subject:'Book' | 'User' | 'all' | 'Revenue') => {
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