import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MileageComponent } from './mileage/mileage.component';
import { ThousandsFormatDirective } from './directives/thousands-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    MileageComponent,
    ThousandsFormatDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
