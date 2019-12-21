import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredetialDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

// Here should be heavy db related logic so that we don't have to write it in service
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredetialDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // we could use find One and then save but we will have 2 queries to db
    // const exists=this.findOne({username})

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      console.log(error.code); //
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
