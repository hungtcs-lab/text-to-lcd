import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextProcessorComponent } from './text-processor.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      fontsList: TextProcessorComponent,
    },
    component: TextProcessorComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    TextProcessorComponent,
  ],
})
export class TextProcessorRoutingModule {


}
