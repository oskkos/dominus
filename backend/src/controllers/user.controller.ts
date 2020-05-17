import {
  Controller, Get, Request, Route, Security, Tags,
} from 'tsoa';
// import signin from '../services/auth.service';
// import { User } from '../models/User';
import { Request as Req } from 'express';
import getUser from '../services/user.service';
import { User } from '../models/User';

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
  public getSelf(@Request() request: Req): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    console.log(request.userId);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return getUser(request.userId);
  }
}
