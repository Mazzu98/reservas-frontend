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

  constructor(private router: Router, private server: ServerProvider,public appState: StateProvider) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
        this.server.updateHeaders(token);
        this.appState.getUser();   
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.server.updateHeaders();
    this.appState.user = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
}
