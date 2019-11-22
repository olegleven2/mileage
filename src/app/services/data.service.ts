import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private mockData: Product[] = [
    {mileage: 10000, label: '10000 mileage service'},
    {mileage: 30000, label: '30000 mileage service'},
    {mileage: 50000, label: '50000 mileage service'},
    {mileage: 70000, label: '70000 mileage service'},
    {mileage: 80000, label: '80000 mileage service'}
    ];

  getProducts(): Product[] {
    return this.mockData;
  }
}
