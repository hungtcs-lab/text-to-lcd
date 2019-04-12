import { CSSClassService } from '../../services/public_api';
import { Directive, Input, Self, OnInit } from '@angular/core';

@Directive({
  selector: '[elevation]',
  providers: [
    CSSClassService,
  ],
})
export class ElevationDirective implements OnInit {
  private _elevation: number = 0;

  @Input('elevation')
  get elevation() {
    return this._elevation;
  }
  set elevation(elevation: number) {
    this._elevation = elevation;
    this.classService.update(this.clssList);
  }

  private get clssList() {
    return {
      [`tcs-elevation-${ this.elevation }`]: this.elevation > 0,
    };
  }

  constructor(
      @Self() private readonly classService: CSSClassService) {

  }

  public ngOnInit() {
    this.classService.update(this.clssList);
  }

}
