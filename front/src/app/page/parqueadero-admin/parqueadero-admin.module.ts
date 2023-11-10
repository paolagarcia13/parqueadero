import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParqueaderoAdminRoutingModule } from './parqueadero-admin-routing.module';
import { ParqueaderoAdminComponent } from './parqueadero-admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ParqueaderoAdminComponent
  ],
  imports: [
    CommonModule,
    ParqueaderoAdminRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ParqueaderoAdminModule { }
