import {
  Controller, Get, Request, Route, Security, Tags,
} from 'tsoa';
import { Request as ExRequest } from 'express';
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
  public getSelf(@Request() request: ExRequest): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    getLogger('user.controller').trace('getSelf', [request.userId as string]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return getUser(request.userId);
  }
}
