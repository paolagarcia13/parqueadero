import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParqueaderoAdminComponent } from './parqueadero-admin.component';

const routes: Routes = [{ path: '', component: ParqueaderoAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueaderoAdminRoutingModule { }
