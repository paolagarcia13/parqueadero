import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'parqueadero', loadChildren: () => import('./page/parqueadero/parqueadero.module').then(m => m.ParqueaderoModule) },
 { path: 'persona', loadChildren: () => import('./page/persona/persona.module').then(m => m.PersonaModule) },
 {
  path: '',
  loadChildren: () => import('./page/parqueadero/parqueadero.module').then(m => m.ParqueaderoModule)
},
 { path: 'parqueadero-admin', loadChildren: () => import('./page/parqueadero-admin/parqueadero-admin.module').then(m => m.ParqueaderoAdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
