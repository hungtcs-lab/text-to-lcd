import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevationDirective } from './elevation.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ElevationDirective,
  ],
  declarations: [
    ElevationDirective,
  ],
})
export class ElevationsModule {


}
