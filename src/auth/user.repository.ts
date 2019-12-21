import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';

// Here should be heavy db related logic so that we don't have to write it in service
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
