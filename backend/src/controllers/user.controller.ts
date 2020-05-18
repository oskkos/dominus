import {
  Controller, Get, Request, Route, Security, Tags,
} from 'tsoa';
import { Request as ExRequest } from 'express';
import openUser from '../services/user.service';
import { User } from '../models/User';
import { decodeToken, getToken } from '../middlewares/auth.jwt';
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
    const token = decodeToken(getToken(request));
    return openUser(token.id);
  }
}
