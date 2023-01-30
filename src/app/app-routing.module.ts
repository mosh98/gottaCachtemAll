import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainerPagePage} from "./pages/trainer-page/trainer-page.page";


const routes: Routes = [
  {path: 'trainer-page',
    component:TrainerPagePage}]

@NgModule({
  imports: [
    RouterModule
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
