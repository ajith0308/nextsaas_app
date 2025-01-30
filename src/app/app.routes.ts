import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: CreateAccountComponent
  },
  {
    path: 'home',
    component: LandingpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart', component: CartComponent,
    canActivate: [AuthGuard]
  },

];

