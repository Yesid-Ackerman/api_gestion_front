import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginDTO } from '@shared/dto/login.dto';
import { AuthService } from '@shared/services/auth.service';
import { TokenService } from '@shared/services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  @ViewChild('formulario') formulario: ElementRef = {} as ElementRef;

  private auth_Service = inject(AuthService);
  private token_Service = inject(TokenService);

  email: string = '';
  password: string = '';

  login_sub: Subscription | null = null;

  ngOnDestroy(): void {
    if (this.login_sub) {
      this.login_sub.unsubscribe();
    }
  }

  login() {
    let data: loginDTO = {
      email: this.email,
      password: this.password,
    };
    this.login_sub = this.auth_Service.login(data).subscribe({
      next: (token) => {
        this.token_Service.setToken(token);
      },
    });
  }
  logout() {
    this.token_Service.removeToken();
  }

  addFocus() {
    let formulario = this.formulario.nativeElement;
    let contenedores = this.formulario.nativeElement.querySelectorAll('#container-input')
    console.log(contenedores);

    contenedores.forEach((element:ElementRef) => {
      console.log(element);
    });
  }
}
