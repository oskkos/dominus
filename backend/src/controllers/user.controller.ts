import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { Request as ExRequest } from 'express';
import * as UserService from '../services/user.service';
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
    return UserService.openUser(token.id);
  }

  /**
   * Add new user
   */
  @Post()
  public addUser(
    @Body() data: { username: string; password: string; name: string },
  ): Promise<void> {
    return UserService.addUser(data.username, data.password, data.name);
  }

  /**
   * Entry point for changing password for current user
   * @param request Used to get token
   * @param userId Id of the current user, should match with the tokens user
   * @param data Object containing oldPwd and newPwd string fields
   * @example userId 20
   */
  @Security('apiKey')
  @Put('{userId}/changePassword')
  public async changePassword(
    @Request() request: ExRequest,
    @Path() userId: number,
    @Body() data: { oldPwd: string; newPwd: string },
  ): Promise<void> {
    const token = decodeToken(getToken(request));
    if (token.id !== userId) {
      throw new Error("Can't change password for other user");
    }
    return UserService.changePassword(userId, data.oldPwd, data.newPwd);
  }
}
