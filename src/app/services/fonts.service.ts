import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FontsService {

  constructor(private readonly http: HttpClient) { }

  public getFontsList() {
    return this.http.get<Array<FontIndex>>('../../assets/fonts/index.json');
  }

}

export class FontIndex {
  name: string;
  file: string;
  [key: string]: any;

}
