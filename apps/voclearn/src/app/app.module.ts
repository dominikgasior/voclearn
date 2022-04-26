import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VoclearnHeaderModule } from '@voclearn/voclearn/header';
import { VoclearnCoreModule } from '@voclearn/voclearn/core';

@NgModule({
  declarations: [AppComponent],
  imports: [VoclearnCoreModule, AppRoutingModule, VoclearnHeaderModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
