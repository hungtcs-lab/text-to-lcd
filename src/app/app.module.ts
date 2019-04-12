import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RoutesModule } from './routes/routes.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ApplicationRef, DoBootstrap } from '@angular/core';

@NgModule({
  imports: [
    RouterModule,
    RoutesModule,
    BrowserModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [
    AppComponent,
  ]
})
export class AppModule implements DoBootstrap {

  constructor(
      private readonly applicationRef: ApplicationRef) {

  }

  public ngDoBootstrap() {
    this.applicationRef.bootstrap(AppComponent);
  }

}
