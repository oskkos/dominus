import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { signin } from '../services/auth.service';
import { AuthToken, AuthUser } from '../models/Auth';
import { getLogger } from '../middlewares/logger';
import * as UserService from '../services/user.service';

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

  /**
   * Add new user
   * @param data AddUserBody: contains fields required for adding new user
   */
  @Post('addUser')
  public addUser(@Body() data: AddUserBody): Promise<void> {
    return UserService.addUser(data.username, data.password, data.name);
  }
}

/**
 * Payload for adding a new user
 * @example {
 *   "username": "oskkos",
 *   "password": "s3cret",
 *   "name": "Oskari Kosonen"
 * }
 */
interface AddUserBody {
  username: string;
  password: string;
  name: string;
}
