import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredetialDto } from './dto/auth-credentials.dto';

// Here should be heavy db related logic so that we don't have to write it in service
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredetialDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;

    await user.save();
  }
}
