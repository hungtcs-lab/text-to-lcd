import { Font, load } from 'opentype.js';
import { Resolve, ActivatedRoute } from '@angular/router';
import { FontIndex, FontsService } from '../../services/fonts.service';
import { CharacterPanelComponent } from './character-panel/character-panel.component';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'tcs-text-processor',
  templateUrl: './text-processor.component.html',
  styleUrls: ['./text-processor.component.scss'],
})
export class TextProcessorComponent implements OnInit, Resolve<Array<FontIndex>> {
  private _fontIndex: FontIndex;

  public font: Font;
  public text: string = 'ABC';
  public fontSize: number = 16;
  public characterBitmapWidth: number = 8;
  public characterBitmapHeight: number = 16;
  public positionX: number;
  public positionY: number;
  public colorThreshold: number = 0x00;

  public codeSnippet: string = '';
  public fontsList: Array<FontIndex> = new Array();

  @ViewChildren(CharacterPanelComponent, { read: CharacterPanelComponent })
  public characterPanels: QueryList<CharacterPanelComponent>;

  get characters() {
    return Array.from(this.text);
  }

  set fontIndex(fontIndex: FontIndex) {
    this.loadFont(fontIndex).then(font => {
      this.font = font;
      this._fontIndex = fontIndex;
    });
  }
  get fontIndex() {
    return this._fontIndex;
  }

  constructor(
      private readonly fontsService: FontsService,
      private readonly activatedRoute: ActivatedRoute) {

  }

  public resolve() {
    return this.fontsService.getFontsList();
  }

  public ngOnInit() {
    this.fontsList = this.activatedRoute.snapshot.data.fontsList;
    this.fontIndex = this.fontsList[0];
    this.resetPosition();
  }

  private loadFont(fontIndex: FontIndex): Promise<Font> {
    return new Promise((resolve, reject) => {
      load(`../../../assets/fonts/${ fontIndex.file }`, (err, font) => {
        if(err) {
          reject(err);
        } else {
          resolve(font);
        }
      });
    });
  }

  public resetPosition() {
    this.positionX = 0;
    this.positionY = (this.characterBitmapHeight * 0.8) >>> 0;
  }

  public generate() {
    this.codeSnippet = this.characterPanels.toArray().map((characterPanel, index) => {
      const data = characterPanel.getArray();
      return `{ ${ data.map(item => `0x${ item.toString(16) }`).join(', ') } }, /* (${ index }) ${ characterPanel.character } */`
    }).join('\n');
  }

}
