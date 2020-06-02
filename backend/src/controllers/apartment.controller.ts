import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { Request as ExRequest } from 'express';
import { Apartment } from '../models/Apartment';
import * as ApartmentService from '../services/apartment.service';
import { getUserId } from '../middlewares/auth.jwt';
@Route('apartments')
@Tags('Apartments')
@Security('apiKey')
export class ApartmentController extends Controller {
  /**
   * Add new apartment
   * @param request Used to get user id
   * @param data Apartment: contains fields required for adding new apartment
   */
  @Post()
  public addApartment(
    @Request() request: ExRequest,
    @Body() data: Apartment,
  ): Promise<Apartment> {
    return ApartmentService.addApartment(data, getUserId(request));
  }

  /**
   * Get all apartments of logged in user
   * @param request
   */
  @Get()
  public getApartments(@Request() request: ExRequest): Promise<Apartment[]> {
    return ApartmentService.getApartments(getUserId(request));
  }
}
