import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerProvider } from '../../services/server.service';
import { StateProvider } from '../../services/state.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private router: Router, private server: ServerProvider, appState: StateProvider) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    else{
      this.server.updateHeaders(token);
    }
  }

  logout() {
    this.server.updateHeaders();
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
}
