import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppInitializeService {

  constructor(
      private readonly http: HttpClient) {

  }

  public initialize(): Promise<any> {
    return Promise.all([]);
  }

}
