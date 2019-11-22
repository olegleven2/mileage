import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.scss']
})
export class MileageComponent implements OnInit {

  /** input value */
  mileageValue: number;
  /** result for show in view */
  mileageResult: Product[];
  /** smallest mileage */
  mileageMinValues: Product[];
  /** biggest mileage */
  mileageMaxValues: Product[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.mileageResult = [];
    this.mileageValue = 40000;
    this.onUpdate();
  }

  /** on update mileage */
  onUpdate(): void {
    const data = this.dataService.getProducts();
    if (this.mileageValue) {
      this.mileageMinValues = data.filter(product => product.mileage <= this.mileageValue).sort(this.compareProducts);
      this.mileageMaxValues = data.filter(product => product.mileage > this.mileageValue).sort(this.compareProducts);
    } else {
      this.mileageMinValues = [];
      this.mileageMaxValues = data.sort(this.compareProducts);
    }
    this.showMore(true);
  }

  /** on show more mileage */
  showMore(resetResult = false): void {
    this.mileageResult = resetResult ? [] : this.mileageResult;
    if (this.mileageMinValues.length) {
      this.mileageResult.push(this.mileageMinValues.pop());
    }
    if (this.mileageMaxValues.length) {
      this.mileageResult.push(this.mileageMaxValues.shift());
    }
    this.mileageResult.sort(this.compareProducts);
  }

  /** (map) method for sort products */
  private compareProducts(a: Product, b: Product): number {
    if ( a.mileage < b.mileage ) {
      return -1;
    }
    if ( a.mileage > b.mileage ) {
      return 1;
    }
    return 0;
  }

}
