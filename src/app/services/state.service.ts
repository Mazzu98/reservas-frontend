import { Injectable } from '@angular/core';
import { authResponse, loginRequest, registerRequest, user } from '../types/auth';
import { ServerProvider } from './server.service';
import { Router } from '@angular/router';

@Injectable()
export class StateProvider {
    user: user | null = null;

    constructor(private router: Router, private server: ServerProvider) {}

    getUser() {
        this.server.getUser()
            .then(user => {
                this.user = user;
                if(user.role == 'admin') {
                    this.router.navigate(['/dashboard']);
                }
                else {
                    this.router.navigate(['/home']);
                }
            })
            .catch(() => {
                localStorage.removeItem('token');
                this.router.navigate(['/login']);
            });
    }
}
