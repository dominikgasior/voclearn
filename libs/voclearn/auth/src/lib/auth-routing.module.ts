import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AlreadyAuthenticatedGuard } from './guards/already-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
