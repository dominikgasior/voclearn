import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../../dtos/email';
import { Password } from '../../dtos/password';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'voclearn-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.authenticate(
        new Email(this.form.value.email),
        new Password(this.form.value.password)
      );
    }
  }
}
