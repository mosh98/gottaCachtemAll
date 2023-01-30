import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TrainerPagePage } from './pages/trainer-page/trainer-page.page';

@NgModule({

  declarations: [
    AppComponent,
    TrainerPagePage
  ],

  imports: [
    BrowserModule
  ],

  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
