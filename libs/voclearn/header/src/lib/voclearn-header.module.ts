import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { VoclearnAuthApiModule } from '@voclearn/voclearn/auth/api';

@NgModule({
  imports: [
    CommonModule,
    VoclearnAuthApiModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class VoclearnHeaderModule {}
