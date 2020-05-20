import {
  Body,
  Controller, Get, Post, Request, Route, Security, Tags,
} from 'tsoa';
import { Request as ExRequest } from 'express';
import { openUser, addUserService } from '../services/user.service';
import { User } from '../models/User';
import { decodeToken, getToken } from '../middlewares/auth.jwt';
@Route('user')
@Tags('User')
export class UserController extends Controller {
  /**
   * Entry point for getting self
   */
  @Security('apiKey')
  @Get('self')
  public getSelf(@Request() request: ExRequest): Promise<User> {
    const token = decodeToken(getToken(request));
    return openUser(token.id);
  }

  @Post()
  public addUser(
    @Body() data: { username: string; password: string; name: string },
  ): Promise<void> {
    return addUserService(data.username, data.password, data.name);
  }
}
