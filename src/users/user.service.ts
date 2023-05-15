// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}

//   findAll(): Promise<User[]> {
//     return this.userRepository.find();
//   }

//   findById(id: number): Promise<User | null> {
//     return this.userRepository.findOneBy({ id });
//   }

//   async remove(id: number): Promise<number | null> {
//     const result = await this.userRepository.delete(id);
//     return result.affected;
//   }

//   async search(filter: any): Promise<User[]> {
//     return this.userRepository.find({where: filter});
//   }

//   async create(user: CreateUserDto): Promise<User> {
//     const newUser = this.userRepository.create(user);
//     return this.userRepository.save(newUser);
//   }
// }



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