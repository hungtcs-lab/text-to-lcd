import { Injectable, ElementRef, Renderer2 } from '@angular/core';

@Injectable()
export class CSSClassService {
  private cssClasses: CSSClasses = {};

  constructor(
      private readonly renderer2: Renderer2,
      private readonly elementRef: ElementRef) {

  }

  public update(cssClasses: CSSClasses) {
    Object.keys(this.cssClasses).forEach(key => {
      this.cssClasses[key] && this.renderer2.removeClass(this.elementRef.nativeElement, key);
    });
    Object.keys(cssClasses).forEach(key => {
      cssClasses[key] && this.renderer2.addClass(this.elementRef.nativeElement, key);
    });
    this.cssClasses = cssClasses;
  }

}

export class CSSClasses {
  [key: string]: boolean;


}
