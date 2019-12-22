import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { User } from './user.entity';
// import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  // DI: in order to use the service
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialDto,
  ): Promise<void> {
    console.log(authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // // test(@Req() req) {
  // //   console.log(req);
  // // }
  // test(@GetUser() user:User) {
  //   console.log(user);
  // }
}
