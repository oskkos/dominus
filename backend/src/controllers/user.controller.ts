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
   * @param request Used to get token
   */
  @Security('apiKey')
  @Get('self')
  public getSelf(@Request() request: ExRequest): Promise<User> {
    const token = decodeToken(getToken(request));
    return UserService.openUser(token.id);
  }

  /**
   * Add new user
   * @param data AddUserBody: contains fields required for adding new user
   */
  @Post()
  public addUser(@Body() data: AddUserBody): Promise<void> {
    return UserService.addUser(data.username, data.password, data.name);
  }

  /**
   * Entry point for changing password for current user
   * @param request Used to get token
   * @param userId Id of the current user, should match with the tokens user
   * @example userId 20
   * @param data ChangePasswordBody: contains oldPwd and newPwd
   */
  @Security('apiKey')
  @Put('{userId}/changePassword')
  public async changePassword(
    @Request() request: ExRequest,
    @Path() userId: number,
    @Body() data: ChangePasswordBody,
  ): Promise<void> {
    const token = decodeToken(getToken(request));
    if (token.id !== userId) {
      throw new Error("Can't change password for other user");
    }
    return UserService.changePassword(userId, data.oldPwd, data.newPwd);
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

/**
 * Payload for changing password
 * @example {
 *   "oldPwd": "too_easy",
 *   "newPwd": "s3cret_p455word"
 * }
 */
interface ChangePasswordBody {
  oldPwd: string;
  newPwd: string;
}
