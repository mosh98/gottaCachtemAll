import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { TrainerPagePage } from './pages/trainer-page/trainer-page.page';
import { LoginPagePage } from './pages/login-page/login-page.page';
import { CataloguePagePage } from './pages/catalogue-page/catalogue-page.page';

@NgModule({

  declarations: [ //Components
    AppComponent,
    TrainerPagePage,
    LoginPagePage,
    CataloguePagePage
  ],

  imports: [ // Modules/Packages
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],

  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
