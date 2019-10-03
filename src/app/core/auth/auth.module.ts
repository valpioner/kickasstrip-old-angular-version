import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EventsComponent } from './components/events/events.component';
import { SpecialComponent } from './components/special/special.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, EventsComponent, SpecialComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
