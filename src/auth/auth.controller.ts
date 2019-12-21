import { Controller, Post, Body } from '@nestjs/common';

import { AuthCredetialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // DI: in order to use the service
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredetialDto): Promise<void> {
    console.log(authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }
}
