import { Injectable } from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
} from 'typeorm';

@Injectable()
export class EntityService<Entity> {
  constructor(protected readonly repository: Repository<Entity>) {
    this.repository = repository;
  }

  async create(input: DeepPartial<Entity>): Promise<Entity> {
    const entity = this.repository.create(input);

    return this.save(entity);
  }

  async save(input: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(input);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);

    return result.affected > 0;
  }

  async getOne(filter: FindOptionsWhere<Entity>): Promise<Entity> {
    return this.repository.findOne({
      where: filter,
    });
  }

  async getMany(filter: FindOptionsWhere<Entity> = {}): Promise<Entity[]> {
    return this.repository.find({
      where: filter,
    });
  }
}
