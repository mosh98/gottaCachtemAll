import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainerPagePage} from "./pages/trainer-page/trainer-page.page";
import {LoginPagePage} from "./pages/login-page/login-page.page";
import {CataloguePagePage} from "./pages/catalogue-page/catalogue-page.page";


const routes: Routes = [
  {path: 'trainer-page',
    component:TrainerPagePage

  },
  {path: 'login-page',
    component:LoginPagePage
  },
  {path:'catalogue-page',
  component:CataloguePagePage}]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
