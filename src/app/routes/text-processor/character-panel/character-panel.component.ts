import { Font } from 'opentype.js';
import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FontIndex } from '../../../services/fonts.service';

@Component({
  selector: 'tcs-character-panel',
  templateUrl: './character-panel.component.html',
  styleUrls: ['./character-panel.component.scss'],
})
export class CharacterPanelComponent implements AfterViewInit {
  private _x: number;
  private _y: number;
  private _font: Font;
  private _width: number;
  private _height: number;
  private _fontSize: number;
  private _character: string;
  private _colorThreshold: number;

  private inited: boolean = false;
  private bitmap: Array<number> = new Array();

  @Input()
  set x(x: number) {
    this._x = x;
    this.inited && this.draw();
  }
  get x() {
    return this._x;
  }

  @Input()
  set y(y: number) {
    this._y = y;
    this.inited && this.draw();
  }
  get y() {
    return this._y;
  }

  @Input()
  set font(font: Font) {
    this._font = font;
    this.inited && this.draw();
  }
  get font() {
    return this._font;
  }

  @Input()
  set width(width: number) {
    this._width = width;
    this.canvas.width = width * 6 + width;

    this.inited && this.draw();
  }
  get width() {
    return this._width;
  }

  @Input()
  set height(height: number) {
    this._height = height;
    this.canvas.height = height * 6 + height;

    this.inited && this.draw();
  }
  get height() {
    return this._height;
  }

  @Input()
  set character(character: string) {
    this._character = character;
  }
  get character() {
    return this._character;
  }

  @Input()
  set fontSize(fontSize: number) {
    this._fontSize = fontSize;
    this.inited && this.draw();
  }
  get fontSize() {
    return this._fontSize;
  }

  @Input()
  set colorThreshold(colorThreshold: number) {
    this._colorThreshold = colorThreshold;
    this.inited && this.draw();
  }
  get colorThreshold() {
    return this._colorThreshold;
  }

  @ViewChild('canvas', { read: ElementRef })
  public canvasElementRef: ElementRef<HTMLCanvasElement>;

  get canvas(): HTMLCanvasElement {
    return this.canvasElementRef.nativeElement;
  }

  get context(): CanvasRenderingContext2D {
    return this.canvas.getContext('2d');
  }

  constructor() {

  }

  public ngAfterViewInit() {
    this.inited = true;
    this.draw();
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid(6, 1, '#DDD');
    this.drawBitmapText(this.font, this.character);
  }

  private drawBitmapText(font: Font, character: string) {
    this.context.beginPath();
    this.bitmap = this.getCharacterBitmap(font, character[0], this.x, this.y, this.width, this.height, this.fontSize);
    let count = 0, x = 0, y = 0;
    this.bitmap.forEach((char) => {
      for(let i=0; i<8; i++) {
        if(count !== 0 && count % this.width === 0) {
          y++;
          x = 0;
        }
        count++;
        if(((char << i) & 0x000000FF) & 0x80) {
          this.context.beginPath();
          this.context.fillRect((1 + x) + (x * 6), (1 + y) + (y * 6), 6, 6);
        }
        x++;
      }
    });
  }

  private drawGrid(gap: number, lineWidth: number=1, lineColor: string='#DDD') {
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = lineColor;
    for(let i=0; i < (this.canvas.width / gap); i++) {
      this.context.beginPath();
      this.context.moveTo(i * (gap + 1), 0);
      this.context.lineTo(i * (gap + 1), this.canvas.height);
      this.context.stroke();
    }
    for(let i=0; i < (this.canvas.height / gap); i++) {
      this.context.beginPath();
      this.context.moveTo(0, i * (gap + 1));
      this.context.lineTo(this.canvas.width, i * (gap + 1));
      this.context.stroke();
    }
  }

  private getCharacterBitmap(font: Font, character: string, x: number, y: number, width: number, height: number, fontSize: number) {
    const $canvas = document.createElement('canvas');
    const context = $canvas.getContext('2d', { alpha: true });
    $canvas.width = width;
    $canvas.height = height;
    if(!$canvas.width || !$canvas.height) {
      return new Array();
    }

    const fontPath = font.getPath(character, x, y, fontSize);
    (fontPath as any).fill = '#000000FF'
    fontPath.draw(context);

    const imageData = context.getImageData(0, 0, $canvas.width, $canvas.height);

    let j=1;
    let value = 0;
    const result = new Array();
    for(let i=0,length=imageData.data.length; i<length; i+=4,j++) {
      value <<= 1;
      if(imageData.data[i+3] > this.colorThreshold) {
        value |= 0x01;
      }
      if((j % 8) === 0) {
        result.push(value);
        j=0;
        value = 0;
      }
    }
    if(j > 1) {
      value <<= 8-(j-1);
      result.push(value);
    }

    document.body.appendChild($canvas);

    return result;
  }

  public getArray() {
    const columnArray = this.getColumnArray();
    const rowBitArray = new Array<Array<Array<number>>>();

    for(let j=1,k=0; j<=this.height; j*=8,k++) {
      let array = new Array();
      for(let i=0; i<this.width; i++) {
        const row = columnArray.reduce((array, item, index) => {
          if(index >= k * 8 && index < (k+1) * 8) {
            array.push(item[i]);
          }
          return array;
        }, new Array<number>()).reverse();
        while(row.length < 8) {
          row.unshift(0);
        }
        array.push(row);
      }
      rowBitArray.push(array);
    }

    const rowByteArray = rowBitArray.map(rows => {
      return rows.map(row => {
        let value = 0;
        for(let i=0; i<8; i++) {
          value <<= 1;
          if(row[i] === 1) {
            value |= 0x01;
          }
        }
        return value;
      });
    });

    return rowByteArray.flat();
  }

  private getColumnArray() {
    const bitArray = this.getBitArray();
    const columnArray = new Array<Array<number>>();

    for(let i=1, length=bitArray.length, array=new Array<number>(); i<=length; i++) {
      array.push(bitArray[i-1]);
      if(i%this.width === 0) {
        columnArray.push([...array]);
        array.length = 0;
      }
    }

    return columnArray;
  }

  private getBitArray() {
    const bitArray = this.bitmap.reduce((bitArray, byte) => {
      for(let i=0; i<8; i++) {
        if((byte << i) & 0x80) {
          bitArray.push(1);
        } else {
          bitArray.push(0);
        }
      }
      return bitArray;
    }, new Array<number>());
    return bitArray;
  }

}
