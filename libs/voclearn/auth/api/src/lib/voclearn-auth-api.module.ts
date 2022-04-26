import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLocalStorage } from './services/auth.local-storage';
import { AuthService } from './services/auth.service';
import { AlreadyAuthenticatedGuard } from './guards/already-authenticated.guard';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, AuthLocalStorage, AlreadyAuthenticatedGuard],
})
export class VoclearnAuthApiModule {}
