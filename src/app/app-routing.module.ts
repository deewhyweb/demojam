import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlsComponent } from '../app/controls/controls.component';
import { AdminComponent } from '../app/admin/admin.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
