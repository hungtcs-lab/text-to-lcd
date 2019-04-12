import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextProcessorRoutingModule } from './text-processor-routing.module';
import { TextProcessorComponent } from './text-processor.component';
import { CharacterPanelComponent } from './character-panel/character-panel.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TextProcessorRoutingModule,
  ],
  declarations: [
    TextProcessorComponent,
    CharacterPanelComponent,
  ],
})
export class TextProcessorModule {


}
