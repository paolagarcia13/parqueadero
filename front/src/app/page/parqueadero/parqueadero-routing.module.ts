import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParqueaderoComponent } from './parqueadero.component';

const routes: Routes = [{ path: '', component: ParqueaderoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueaderoRoutingModule { }
