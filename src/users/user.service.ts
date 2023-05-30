import { Injectable } from '@nestjs/common';

import { Repository, DeepPartial, FindOptionsWhere, FindOptionsSelect, FindOptionsRelations } from 'typeorm';
import { EntityService } from '../entities/entity.service';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserService extends EntityService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userRepository);
  }
}