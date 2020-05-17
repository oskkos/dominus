import {
  Controller, Get, Route, Security, Tags,
} from 'tsoa';
import getUser from '../services/user.service';
import { User } from '../models/User';
import { getLogger } from '../middlewares/logger';

@Route('user')
@Tags('User')
// eslint-disable-next-line import/prefer-default-export
export class UserController extends Controller {
  /**
   * Entry point for getting self
   */
  @Security('apiKey')
  @Get('self')
  // eslint-disable-next-line class-methods-use-this
  public getSelf(): Promise<User> {
    getLogger('user.controller').trace('getSelf');
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return getUser(globalThis.userId);
  }
}
