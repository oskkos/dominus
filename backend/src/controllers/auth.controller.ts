import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { signin } from '../services/auth.service';
import { AuthToken, AuthUser } from '../models/Auth';
import { getLogger } from '../middlewares/logger';

const logger = getLogger();

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  /**
   * Authenticates user into dominus. Supply proper username and password.
   * @param user AuthUser: contains details required for signing into system
   */
  @Post('signin')
  public async signin(@Body() user: AuthUser): Promise<AuthToken> {
    try {
      const token = await signin(user);
      logger.trace(`Signed in user [${user.username}]`);
      return token;
    } catch (err) {
      logger.error(`Failed to sign-in user [${user.username}]`);
      throw err;
    }
  }
}
