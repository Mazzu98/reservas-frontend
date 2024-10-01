import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerProvider } from '../../services/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private server: ServerProvider,
    private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.server.login({ email, password })
        .then(response => {
          this.server.updateHeaders(response.access_token);
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error(error);
          this.loginError = error.message;
        });
    }
  }
}
