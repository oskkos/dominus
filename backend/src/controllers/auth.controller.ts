import { Body, Controller, Example, Post, Route, Tags } from 'tsoa';
import { signin } from '../services/auth.service';
import { AuthToken, AuthUser } from '../models/Auth';
import { getLogger } from '../middlewares/logger';

const logger = getLogger();

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  /**
   * Authenticates user into dominus. Supply proper username and password.
   */
  @Post('signin')
  @Example<AuthToken>({
    id: 82,
    username: 'oskkos',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJvc2trb3MiLCJpYXQiOjE1OTAyMjMxOTgsImV4cCI6MTU5MDMwOTU5OH0.tP-5h7NmH9aafoIKACrlkFZkLpY3slRRdJbTMk8jMHw',
  })
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
