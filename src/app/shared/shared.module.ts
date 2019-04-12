import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevationsModule } from './elevations/elevations.module';

@NgModule({
  imports: [
    CommonModule,
    ElevationsModule,
  ],
  exports: [
    CommonModule,
    ElevationsModule,
  ],
})
export class SharedModule {


}
