import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
  ],
  exports: [
    DefaultLayoutComponent,
  ],
  declarations: [
    DefaultLayoutComponent,
    HeaderComponent,
  ],
})
export class LayoutModule {


}
