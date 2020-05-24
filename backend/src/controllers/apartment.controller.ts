import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { Apartment } from '../models/Apartment';

@Route('apartment')
@Tags('Apartment')
export class ApartmentController extends Controller {
  /**
   * Add new apartment
   * @param data Apartment: contains fields required for adding new apartment
   */
  @Post()
  public addApartment(@Body() data: Apartment): void {
    // TODO: Actual implementation
    // eslint-disable-next-line no-console
    console.log(data);
  }
}
