import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  sendForgotPasswordEmail(): void {
    this.loading = true;
    this.form.controls.email.disable();
    this.auth
      .sendForgotPasswordEmail(this.form.controls.email.value)
      .then(() => {
        setTimeout(() => {
          this.loading = false;
          this.form.controls.email.enable();
          this.snackBar.open(
            `Se ha enviado el correo para reiniciar la contraseña de ${this.form.controls.email.value}`,
            '',
            {
              duration: 4000,
            }
          );
          this.router.navigate(['/']);
        }, 500);
      });
  }

  ngOnInit(): void {}
}
