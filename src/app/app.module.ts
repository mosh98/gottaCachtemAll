import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TrainerPagePage } from './pages/trainer-page/trainer-page.page';
import { LoginPagePage } from './pages/login-page/login-page.page';
import { CataloguePagePage } from './pages/catalogue-page/catalogue-page.page';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainerPagePage,
    LoginPagePage,
    CataloguePagePage,
    LoginFormComponent,
  ],

  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
