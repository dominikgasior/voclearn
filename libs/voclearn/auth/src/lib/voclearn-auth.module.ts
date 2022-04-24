import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { AlreadyAuthenticatedGuard } from './guards/already-authenticated.guard';
import { AuthStorage } from './services/auth.storage';
import { LocalStorageAuthStorage } from './services/local-storage-auth.storage';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    AlreadyAuthenticatedGuard,
    {
      provide: AuthStorage,
      useClass: LocalStorageAuthStorage,
    },
  ],
})
export class VoclearnAuthModule {}
