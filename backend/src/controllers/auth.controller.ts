import {
  Body, Controller, Post, Route, Tags,
} from 'tsoa';
import signin from '../services/auth.service';
import { AuthUser } from '../models/User';
import { Token } from '../models/Auth';

@Route('auth')
@Tags('Auth')
// eslint-disable-next-line import/prefer-default-export
export class AuthController extends Controller {
  /**
   * Authenticates user into dominus. Supply proper username and password.
   */
  @Post('signin')
  // eslint-disable-next-line class-methods-use-this
  public async signin(@Body() user: AuthUser): Promise<Token> {
    return signin(user);
  }
}
