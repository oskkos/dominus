import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { Apartment } from '../models/Apartment';
import * as ApartmentService from '../services/apartment.service';
@Route('apartment')
@Tags('Apartment')
export class ApartmentController extends Controller {
  /**
   * Add new apartment
   * @param data Apartment: contains fields required for adding new apartment
   */
  @Post()
  public addApartment(@Body() data: Apartment): Promise<Apartment> {
    return ApartmentService.addApartment(data);
  }
}
