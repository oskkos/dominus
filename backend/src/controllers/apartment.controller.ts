import { Body, Controller, Post, Request, Route, Security, Tags } from 'tsoa';
import { Request as ExRequest } from 'express';
import { Apartment } from '../models/Apartment';
import * as ApartmentService from '../services/apartment.service';
import { getUserId } from '../middlewares/auth.jwt';
@Route('apartment')
@Tags('Apartment')
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
}
