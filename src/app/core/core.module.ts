import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material/material.module';

import { AuthModule } from './auth/auth.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
