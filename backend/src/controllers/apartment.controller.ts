import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Request,
  Response,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { Request as ExRequest } from 'express';
import { AddApartment, Apartment } from '../models/Apartment';
import * as ApartmentService from '../services/apartment.service';
import { getUserId } from '../middlewares/auth.jwt';

interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}

@Route('apartments')
@Tags('Apartments')
@Security('apiKey')
export class ApartmentController extends Controller {
  /**
   * Add new apartment
   * @param request Used to get user id
   * @param data Apartment: contains fields required for adding new apartment
   */
  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @Post()
  public addApartment(
    @Request() request: ExRequest,
    @Body() data: AddApartment,
  ): Promise<Apartment> {
    return ApartmentService.addApartment(data, getUserId(request));
  }

  /**
   * Add new apartment
   * @param request Used to get user id
   * @param apartmentId Apartment that should get new co-owner
   * @example apartmentId 1
   * @isInt apartmentId Must give integer value
   * @param coOwnerId New co-owner
   * @example coOwnerId 2
   * @isInt coOwnerId Must give integer value
   */
  @Put('{apartmentId}/addCoOwner/{coOwnerId}')
  public addCoOwner(
    @Request() request: ExRequest,
    @Path() apartmentId: number,
    @Path() coOwnerId: number,
  ): Promise<void> {
    return ApartmentService.addCoOwner(
      apartmentId,
      getUserId(request),
      coOwnerId,
    ).catch((e) => {
      throw e;
    });
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
