import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
    // redirectTo: '/events',
    // pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
    // data: { title: 'Heroes List' }
  },
  {
    path: 'register',
    component: RegisterComponent
  },
          //   { path: '', component: AppComponent, children: [
          //     { path: '',
          //       component: HomeComponent
          //     },
          //     { path: 'login',
          //       component: LoginComponent,
          //       canActivate: [GuestGuard]
          //     },
          //     {
          //       path: 'protected',
          //       component: ProtectedComponent, canActivate: [LoggedInGuard]
          //     }
          // ]}
  // { path: 'hero/:id',      component: HeroDetailComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);
